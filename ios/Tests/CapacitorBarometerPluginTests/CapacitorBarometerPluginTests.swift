import XCTest
@testable import CapacitorBarometerPlugin

final class CapacitorBarometerPluginTests: XCTestCase {
    func testPluginInitialises() {
        let plugin = CapacitorBarometerPlugin()
        XCTAssertEqual(plugin.identifier, "CapacitorBarometerPlugin")
    }
}
