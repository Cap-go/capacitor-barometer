import type { PluginListenerHandle } from '@capacitor/core';

/**
 * Air pressure and relative altitude values sampled from the device barometer.
 *
 * @since 1.0.0
 */
export interface Measurement {
  /**
   * The static air pressure in hectopascals (hPa).
   *
  * @since 1.0.0
   */
  pressure: number;

  /**
   * The change in altitude relative to the time updates started.
   * Only available on iOS; Android will always return `0`.
   *
   * @since 1.0.0
   */
  relativeAltitude: number;

  /**
   * The timestamp of the measurement in milliseconds since the Unix epoch.
   *
   * @since 1.0.0
   */
  timestamp: number;
}

/**
 * Result returned by {@link CapacitorBarometerPlugin.isAvailable}.
 *
 * @since 1.0.0
 */
export interface IsAvailableResult {
  /**
   * Indicates whether the device exposes a barometer sensor.
   *
   * @since 1.0.0
   */
  isAvailable: boolean;
}

/**
 * Permission information returned by {@link CapacitorBarometerPlugin.checkPermissions}
 * and {@link CapacitorBarometerPlugin.requestPermissions}.
 *
 * @since 1.0.0
 */
export interface PermissionStatus {
  /**
   * The permission state for accessing barometer measurements on the current platform.
   *
   * @since 1.0.0
   */
  barometer: BarometerPermissionState;
}

/**
 * Alias for the most recent pressure sample.
 *
 * @since 1.0.0
 */
export type GetMeasurementResult = Measurement;

/**
 * Permission state union including `limited` for platforms that can throttle sensor access.
 *
 * @since 1.0.0
 */
export type BarometerPermissionState = PermissionState | 'limited';

/**
 * Platform permission states supported by Capacitor.
 *
 * @since 1.0.0
 */
export type PermissionState = 'prompt' | 'prompt-with-rationale' | 'granted' | 'denied';

/**
 * Event payload emitted when {@link CapacitorBarometerPlugin.startMeasurementUpdates}
 * is active.
 *
 * @since 1.0.0
 */
export type MeasurementEvent = Measurement;

/**
 * Capacitor plugin contract for working with the device barometer sensor.
 *
 * @since 1.0.0
 */
export interface CapacitorBarometerPlugin {
  /**
   * Get the most recent barometer reading captured by the native layer.
   *
   * @returns The latest pressure, relative altitude, and timestamp.
   * @since 1.0.0
   */
  getMeasurement(): Promise<GetMeasurementResult>;

  /**
   * Check if the current device includes a barometer sensor.
   *
   * @returns Whether a barometer is available.
   * @since 1.0.0
   */
  isAvailable(): Promise<IsAvailableResult>;

  /**
   * Begin streaming barometer updates to the JavaScript layer.
   *
   * Call {@link addListener} with the `measurement` event to receive the updates.
   *
   * @since 1.0.0
   */
  startMeasurementUpdates(): Promise<void>;

  /**
   * Stop the continuous updates started via {@link startMeasurementUpdates}.
   *
   * @since 1.0.0
   */
  stopMeasurementUpdates(): Promise<void>;

  /**
   * Return the current permission state for accessing barometer data.
   *
   * @since 1.0.0
   */
  checkPermissions(): Promise<PermissionStatus>;

  /**
   * Request permission to access barometer data if required by the platform.
   *
   * @since 1.0.0
   */
  requestPermissions(): Promise<PermissionStatus>;

  /**
   * Listen for pressure updates.
   *
   * @param eventName Only the `measurement` event is supported.
   * @param listenerFunc Callback invoked with each measurement.
   * @since 1.0.0
   */
  addListener(eventName: 'measurement', listenerFunc: (event: MeasurementEvent) => void): Promise<PluginListenerHandle>;

  /**
   * Remove all registered listeners for this plugin.
   *
   * @since 1.0.0
   */
  removeAllListeners(): Promise<void>;
}
