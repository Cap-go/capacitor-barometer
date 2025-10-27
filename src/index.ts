import { registerPlugin } from '@capacitor/core';

import type { CapacitorBarometerPlugin } from './definitions';

const CapacitorBarometer = registerPlugin<CapacitorBarometerPlugin>('CapacitorBarometer', {
  web: () => import('./web').then((m) => new m.CapacitorBarometerWeb()),
});

export * from './definitions';
export { CapacitorBarometer };
