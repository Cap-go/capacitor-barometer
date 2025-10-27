# Example App for `@capgo/capacitor-barometer`

This Vite project links directly to the local plugin source so you can exercise the barometer APIs while developing.

## Playground actions

- **Start updates** – Begins streaming pressure measurements so you can confirm native wiring.
- **Stop updates** – Stops the continuous stream.
- **Read once** – Requests a single measurement snapshot without subscribing to events.

## Getting started

```bash
npm install
npm start
```

Add native shells with `npx cap add ios` or `npx cap add android` from this folder to try behaviour on device or simulator.
