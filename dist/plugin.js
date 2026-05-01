var capacitorCapacitorBarometer = (function (exports, core) {
    'use strict';

    const CapacitorBarometer = core.registerPlugin('CapacitorBarometer', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.CapacitorBarometerWeb()),
    });

    class CapacitorBarometerWeb extends core.WebPlugin {
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

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        CapacitorBarometerWeb: CapacitorBarometerWeb
    });

    exports.CapacitorBarometer = CapacitorBarometer;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
