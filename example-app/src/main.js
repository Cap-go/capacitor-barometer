import './style.css';
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const measurementLabel = document.getElementById('measurement');
const availabilityLabel = document.getElementById('availability');
const permissionLabel = document.getElementById('permission');
const startButton = document.getElementById('start-updates');
const stopButton = document.getElementById('stop-updates');
const singleReadButton = document.getElementById('read-once');

let measurementListener;

function formatMeasurement(measurement) {
  const pressure = measurement.pressure?.toFixed(2) ?? '0.00';
  const altitude = measurement.relativeAltitude?.toFixed(2) ?? '0.00';
  const timestamp = new Date(measurement.timestamp ?? Date.now()).toLocaleTimeString();
  return `Pressure: ${pressure} hPa\nRelative altitude: ${altitude} m\nTimestamp: ${timestamp}`;
}

async function refreshAvailability() {
  const { isAvailable } = await CapacitorBarometer.isAvailable();
  availabilityLabel.textContent = isAvailable ? 'Available' : 'Not available';
}

async function refreshPermission() {
  const { barometer } = await CapacitorBarometer.checkPermissions();
  permissionLabel.textContent = barometer;
}

async function ensurePermission() {
  const { barometer } = await CapacitorBarometer.requestPermissions();
  permissionLabel.textContent = barometer;
  if (barometer !== 'granted') {
    throw new Error(`Permission not granted: ${barometer}`);
  }
}

async function readOnce() {
  try {
    await ensurePermission();
    const measurement = await CapacitorBarometer.getMeasurement();
    measurementLabel.textContent = formatMeasurement(measurement);
  } catch (error) {
    measurementLabel.textContent = error.message ?? String(error);
  }
}

async function startUpdates() {
  try {
    await ensurePermission();
    if (!measurementListener) {
      measurementListener = await CapacitorBarometer.addListener('measurement', (event) => {
        measurementLabel.textContent = formatMeasurement(event);
      });
    }
    await CapacitorBarometer.startMeasurementUpdates();
    startButton.disabled = true;
    stopButton.disabled = false;
    singleReadButton.disabled = true;
  } catch (error) {
    measurementLabel.textContent = error.message ?? String(error);
  }
}

async function stopUpdates() {
  await CapacitorBarometer.stopMeasurementUpdates();
  if (measurementListener) {
    await measurementListener.remove();
    measurementListener = undefined;
  }
  startButton.disabled = false;
  stopButton.disabled = true;
  singleReadButton.disabled = false;
}

startButton.addEventListener('click', startUpdates);
stopButton.addEventListener('click', stopUpdates);
singleReadButton.addEventListener('click', readOnce);

refreshAvailability();
refreshPermission();
