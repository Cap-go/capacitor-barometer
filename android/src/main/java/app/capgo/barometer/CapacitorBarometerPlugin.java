package app.capgo.barometer;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import androidx.annotation.Nullable;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "CapacitorBarometer")
public class CapacitorBarometerPlugin extends Plugin implements SensorEventListener {

    private final String pluginVersion = "7.2.4";
    private static final String PERMISSION_GRANTED = "granted";
    private static final String PERMISSION_DENIED = "denied";

    @Nullable
    private SensorManager sensorManager;

    @Nullable
    private Sensor barometer;

    private final JSObject lastMeasurement = new JSObject();

    private boolean updatesActive = false;

    @Override
    public void load() {
        Context context = getContext();
        sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager != null) {
            barometer = sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE);
        }
        lastMeasurement.put("pressure", 0);
        lastMeasurement.put("relativeAltitude", 0);
        lastMeasurement.put("timestamp", (double) System.currentTimeMillis());
    }

    @PluginMethod
    public void getMeasurement(PluginCall call) {
        if (barometer == null) {
            call.reject("Barometer sensor not available on this device.");
            return;
        }
        call.resolve(snapshotMeasurement());
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject result = new JSObject();
        result.put("isAvailable", barometer != null);
        call.resolve(result);
    }

    @PluginMethod
    public void startMeasurementUpdates(PluginCall call) {
        if (barometer == null) {
            call.reject("Barometer sensor not available on this device.");
            return;
        }
        if (updatesActive) {
            call.resolve();
            return;
        }
        if (sensorManager != null && sensorManager.registerListener(this, barometer, SensorManager.SENSOR_DELAY_NORMAL)) {
            updatesActive = true;
            call.resolve();
        } else {
            call.reject("Failed to register barometer listener.");
        }
    }

    @PluginMethod
    public void stopMeasurementUpdates(PluginCall call) {
        if (sensorManager != null && updatesActive) {
            sensorManager.unregisterListener(this);
            updatesActive = false;
        }
        call.resolve();
    }

    @PluginMethod
    public void checkPermissions(PluginCall call) {
        JSObject result = new JSObject();
        result.put("barometer", barometer != null ? PERMISSION_GRANTED : PERMISSION_DENIED);
        call.resolve(result);
    }

    @PluginMethod
    public void requestPermissions(PluginCall call) {
        checkPermissions(call);
    }

    @PluginMethod
    public void removeAllListeners(PluginCall call) {
        super.removeAllListeners(call);
    }

    @Override
    public void handleOnPause() {
        if (sensorManager != null && updatesActive) {
            sensorManager.unregisterListener(this);
        }
        super.handleOnPause();
    }

    @Override
    public void handleOnResume() {
        super.handleOnResume();
        if (updatesActive && sensorManager != null && barometer != null) {
            sensorManager.registerListener(this, barometer, SensorManager.SENSOR_DELAY_NORMAL);
        }
    }

    @Override
    public void handleOnDestroy() {
        if (sensorManager != null) {
            sensorManager.unregisterListener(this);
        }
        super.handleOnDestroy();
    }

    @Override
    public void onSensorChanged(SensorEvent event) {
        if (event.sensor.getType() != Sensor.TYPE_PRESSURE) {
            return;
        }

        double pressure = event.values[0]; // Already reported in hPa
        double timestamp = System.currentTimeMillis();

        lastMeasurement.put("pressure", pressure);
        lastMeasurement.put("relativeAltitude", 0);
        lastMeasurement.put("timestamp", timestamp);

        JSObject payload = new JSObject();
        payload.put("pressure", pressure);
        payload.put("relativeAltitude", 0);
        payload.put("timestamp", timestamp);
        notifyListeners("measurement", payload);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // No-op
    }

    private JSObject snapshotMeasurement() {
        JSObject copy = new JSObject();
        copy.put("pressure", lastMeasurement.optDouble("pressure", 0));
        copy.put("relativeAltitude", lastMeasurement.optDouble("relativeAltitude", 0));
        copy.put("timestamp", lastMeasurement.optDouble("timestamp", 0));
        return copy;
    }

    @PluginMethod
    public void getPluginVersion(final PluginCall call) {
        try {
            final JSObject ret = new JSObject();
            ret.put("version", this.pluginVersion);
            call.resolve(ret);
        } catch (final Exception e) {
            call.reject("Could not get plugin version", e);
        }
    }
}
