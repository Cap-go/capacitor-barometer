# @capgo/capacitor-barometer
<a href="https://capgo.app/"><img src="https://capgo.app/readme-banner.svg?repo=Cap-go/capacitor-barometer" alt="Capgo - Instant updates for Capacitor" /></a>

<div align="center">
  <h2><a href="https://capgo.app/?ref=plugin_barometer"> ➡️ Get Instant updates for your App with Capgo</a></h2>
  <h2><a href="https://capgo.app/consulting/?ref=plugin_barometer"> Missing a feature? We’ll build the plugin for you 💪</a></h2>
</div>


Access barometer pressure measurements across iOS and Android.

## Documentation

The most complete doc is available here: https://capgo.app/docs/plugins/barometer/

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| -------------- | ----------------------- | ---------- |
| v8.\*.\*       | v8.\*.\*                | ✅          |
| v7.\*.\*       | v7.\*.\*                | On demand   |
| v6.\*.\*       | v6.\*.\*                | ❌          |
| v5.\*.\*       | v5.\*.\*                | ❌          |

> **Note:** The major version of this plugin follows the major version of Capacitor. Use the version that matches your Capacitor installation (e.g., plugin v8 for Capacitor 8). Only the latest major version is actively maintained.

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/cap-go/capacitor-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `cap-go/capacitor-skills` to install the `@capgo/capacitor-barometer` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
npm install @capgo/capacitor-barometer
npx cap sync
```

## API

<docgen-index>

* [`getMeasurement()`](#getmeasurement)
* [`isAvailable()`](#isavailable)
* [`startMeasurementUpdates()`](#startmeasurementupdates)
* [`stopMeasurementUpdates()`](#stopmeasurementupdates)
* [`checkPermissions()`](#checkpermissions)
* [`requestPermissions()`](#requestpermissions)
* [`addListener('measurement', ...)`](#addlistenermeasurement-)
* [`removeAllListeners()`](#removealllisteners)
* [`getPluginVersion()`](#getpluginversion)
* [Interfaces](#interfaces)
* [Type Aliases](#type-aliases)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

Capacitor plugin contract for working with the device barometer sensor.

### getMeasurement()

```typescript
getMeasurement() => Promise<GetMeasurementResult>
```

Get the most recent barometer reading captured by the native layer.

**Returns:** <code>Promise&lt;<a href="#measurement">Measurement</a>&gt;</code>

**Since:** 1.0.0

--------------------


### isAvailable()

```typescript
isAvailable() => Promise<IsAvailableResult>
```

Check if the current device includes a barometer sensor.

**Returns:** <code>Promise&lt;<a href="#isavailableresult">IsAvailableResult</a>&gt;</code>

**Since:** 1.0.0

--------------------


### startMeasurementUpdates()

```typescript
startMeasurementUpdates() => Promise<void>
```

Begin streaming barometer updates to the JavaScript layer.

Call {@link addListener} with the `measurement` event to receive the updates.

**Since:** 1.0.0

--------------------


### stopMeasurementUpdates()

```typescript
stopMeasurementUpdates() => Promise<void>
```

Stop the continuous updates started via {@link startMeasurementUpdates}.

**Since:** 1.0.0

--------------------


### checkPermissions()

```typescript
checkPermissions() => Promise<PermissionStatus>
```

Return the current permission state for accessing barometer data.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### requestPermissions()

```typescript
requestPermissions() => Promise<PermissionStatus>
```

Request permission to access barometer data if required by the platform.

**Returns:** <code>Promise&lt;<a href="#permissionstatus">PermissionStatus</a>&gt;</code>

**Since:** 1.0.0

--------------------


### addListener('measurement', ...)

```typescript
addListener(eventName: 'measurement', listenerFunc: (event: MeasurementEvent) => void) => Promise<PluginListenerHandle>
```

Listen for pressure updates.

| Param              | Type                                                                    | Description                                |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------ |
| **`eventName`**    | <code>'measurement'</code>                                              | Only the `measurement` event is supported. |
| **`listenerFunc`** | <code>(event: <a href="#measurement">Measurement</a>) =&gt; void</code> | Callback invoked with each measurement.    |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

**Since:** 1.0.0

--------------------


### removeAllListeners()

```typescript
removeAllListeners() => Promise<void>
```

Remove all registered listeners for this plugin.

**Since:** 1.0.0

--------------------


### getPluginVersion()

```typescript
getPluginVersion() => Promise<{ version: string; }>
```

Get the native Capacitor plugin version.

**Returns:** <code>Promise&lt;{ version: string; }&gt;</code>

**Since:** 1.0.0

--------------------


### Interfaces


#### Measurement

Air pressure and relative altitude values sampled from the device barometer.

| Prop                   | Type                | Description                                                                                                         | Since |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------- | ----- |
| **`pressure`**         | <code>number</code> | The static air pressure in hectopascals (hPa).                                                                      | 1.0.0 |
| **`relativeAltitude`** | <code>number</code> | The change in altitude relative to the time updates started. Only available on iOS; Android will always return `0`. | 1.0.0 |
| **`timestamp`**        | <code>number</code> | The timestamp of the measurement in milliseconds since the Unix epoch.                                              | 1.0.0 |


#### IsAvailableResult

Result returned by {@link CapacitorBarometerPlugin.isAvailable}.

| Prop              | Type                 | Description                                              | Since |
| ----------------- | -------------------- | -------------------------------------------------------- | ----- |
| **`isAvailable`** | <code>boolean</code> | Indicates whether the device exposes a barometer sensor. | 1.0.0 |


#### PermissionStatus

Permission information returned by {@link CapacitorBarometerPlugin.checkPermissions}
and {@link CapacitorBarometerPlugin.requestPermissions}.

| Prop            | Type                                                                          | Description                                                                        | Since |
| --------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ----- |
| **`barometer`** | <code><a href="#barometerpermissionstate">BarometerPermissionState</a></code> | The permission state for accessing barometer measurements on the current platform. | 1.0.0 |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Type Aliases


#### GetMeasurementResult

Alias for the most recent pressure sample.

<code><a href="#measurement">Measurement</a></code>


#### BarometerPermissionState

Permission state union including `limited` for platforms that can throttle sensor access.

<code><a href="#permissionstate">PermissionState</a> | 'limited'</code>


#### PermissionState

<code>'prompt' | 'prompt-with-rationale' | 'granted' | 'denied'</code>


#### MeasurementEvent

Event payload emitted when {@link CapacitorBarometerPlugin.startMeasurementUpdates}
is active.

<code><a href="#measurement">Measurement</a></code>

</docgen-api>

### Credit

This plugin was inspired from: https://github.com/kesha-antonov/react-native-background-downloader
