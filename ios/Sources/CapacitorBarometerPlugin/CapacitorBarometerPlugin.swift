import Capacitor
import CoreMotion
import Foundation

@objc(CapacitorBarometerPlugin)
public class CapacitorBarometerPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorBarometerPlugin"
    public let jsName = "CapacitorBarometer"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getMeasurement", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startMeasurementUpdates", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopMeasurementUpdates", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "checkPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestPermissions", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "removeAllListeners", returnType: CAPPluginReturnPromise),
    ]

    private let altimeter = CMAltimeter()
    private var updatesActive = false
    private var latestMeasurement: [String: Any] = [
        "pressure": 0.0,
        "relativeAltitude": 0.0,
        "timestamp": Date().timeIntervalSince1970 * 1000,
    ]

    @objc func getMeasurement(_ call: CAPPluginCall) {
        guard CMAltimeter.isRelativeAltitudeAvailable() else {
            call.reject("Barometer not available")
            return
        }

        call.resolve(latestMeasurement)
    }

    @objc func isAvailable(_ call: CAPPluginCall) {
        call.resolve(["isAvailable": CMAltimeter.isRelativeAltitudeAvailable()])
    }

    @objc func startMeasurementUpdates(_ call: CAPPluginCall) {
        guard CMAltimeter.isRelativeAltitudeAvailable() else {
            call.reject("Barometer not available")
            return
        }

        if updatesActive {
            call.resolve()
            return
        }

        altimeter.startRelativeAltitudeUpdates(to: OperationQueue.main) { [weak self] data, error in
            guard let self else { return }

            if let error {
                CAPLog.print("CapacitorBarometerPlugin", "Barometer error: \(error.localizedDescription)")
                return
            }

            guard let data else { return }

            let pressureHectoPascal = data.pressure.doubleValue * 10.0
            let relativeAltitudeMeters = data.relativeAltitude.doubleValue
            let timestamp = Date().timeIntervalSince1970 * 1000

            let measurement: [String: Any] = [
                "pressure": pressureHectoPascal,
                "relativeAltitude": relativeAltitudeMeters,
                "timestamp": timestamp,
            ]

            self.latestMeasurement = measurement
            DispatchQueue.main.async {
                self.notifyListeners("measurement", data: measurement)
            }
        }

        updatesActive = true
        call.resolve()
    }

    @objc func stopMeasurementUpdates(_ call: CAPPluginCall) {
        if updatesActive {
            altimeter.stopRelativeAltitudeUpdates()
            updatesActive = false
        }
        call.resolve()
    }

    @objc override public func checkPermissions(_ call: CAPPluginCall) {
        call.resolve(["barometer": currentPermissionState()])
    }

    @objc override public func requestPermissions(_ call: CAPPluginCall) {
        call.resolve(["barometer": currentPermissionState()])
    }

    @objc override public func removeAllListeners(_ call: CAPPluginCall) {
        super.removeAllListeners(call)
    }

    private func currentPermissionState() -> String {
        guard CMAltimeter.isRelativeAltitudeAvailable() else {
            return "denied"
        }

        if #available(iOS 17.0, *) {
            switch CMAltimeter.authorizationStatus() {
            case .authorized:
                return "granted"
            case .denied, .restricted:
                return "denied"
            case .notDetermined:
                return "prompt"
            @unknown default:
                return "prompt"
            }
        }

        return "granted"
    }
}
