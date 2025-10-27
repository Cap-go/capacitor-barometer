import { WebPlugin } from '@capacitor/core';

import type { CapacitorBarometerPlugin, GetMeasurementResult, IsAvailableResult, PermissionStatus } from './definitions';

export class CapacitorBarometerWeb extends WebPlugin implements CapacitorBarometerPlugin {

  async getMeasurement(): Promise<GetMeasurementResult> {
    throw this.unavailable('Barometer measurements are not available on the web.');
  }

  async isAvailable(): Promise<IsAvailableResult> {
    return { isAvailable: false };
  }

  async startMeasurementUpdates(): Promise<void> {
    throw this.unavailable('Barometer measurements are not available on the web.');
  }

  async stopMeasurementUpdates(): Promise<void> {
    // No-op on the web implementation.
  }

  async checkPermissions(): Promise<PermissionStatus> {
    return { barometer: 'denied' };
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return { barometer: 'denied' };
  }

  async removeAllListeners(): Promise<void> {
    await super.removeAllListeners();
  }
}
