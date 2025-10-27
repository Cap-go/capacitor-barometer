// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoCapacitorBarometer",
    platforms: [.iOS(.v14)],
    products: [
        .library(
            name: "CapgoCapacitorBarometer",
            targets: ["CapacitorBarometerPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "7.0.0")
    ],
    targets: [
        .target(
            name: "CapacitorBarometerPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/CapacitorBarometerPlugin"),
        .testTarget(
            name: "CapacitorBarometerPluginTests",
            dependencies: ["CapacitorBarometerPlugin"],
            path: "ios/Tests/CapacitorBarometerPluginTests")
    ]
)
