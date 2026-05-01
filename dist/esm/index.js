import { registerPlugin } from '@capacitor/core';
const CapacitorBarometer = registerPlugin('CapacitorBarometer', {
    web: () => import('./web').then((m) => new m.CapacitorBarometerWeb()),
});
export * from './definitions';
export { CapacitorBarometer };
//# sourceMappingURL=index.js.map