import { WebPlugin } from '@capacitor/core';
import type { CapacitorBarometerPlugin, GetMeasurementResult, IsAvailableResult, PermissionStatus } from './definitions';
export declare class CapacitorBarometerWeb extends WebPlugin implements CapacitorBarometerPlugin {
    getMeasurement(): Promise<GetMeasurementResult>;
    isAvailable(): Promise<IsAvailableResult>;
    startMeasurementUpdates(): Promise<void>;
    stopMeasurementUpdates(): Promise<void>;
    checkPermissions(): Promise<PermissionStatus>;
    requestPermissions(): Promise<PermissionStatus>;
    removeAllListeners(): Promise<void>;
    getPluginVersion(): Promise<{
        version: string;
    }>;
}
