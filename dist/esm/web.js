import { WebPlugin } from '@capacitor/core';
export class CapacitorBarometerWeb extends WebPlugin {
    async getMeasurement() {
        throw this.unavailable('Barometer measurements are not available on the web.');
    }
    async isAvailable() {
        return { isAvailable: false };
    }
    async startMeasurementUpdates() {
        throw this.unavailable('Barometer measurements are not available on the web.');
    }
    async stopMeasurementUpdates() {
        // No-op on the web implementation.
    }
    async checkPermissions() {
        return { barometer: 'denied' };
    }
    async requestPermissions() {
        return { barometer: 'denied' };
    }
    async removeAllListeners() {
        await super.removeAllListeners();
    }
    async getPluginVersion() {
        return { version: 'web' };
    }
}
//# sourceMappingURL=web.js.map