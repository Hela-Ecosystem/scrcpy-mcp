## [3.0.4] - 2026-11-18

### Fixed
- The device message parser only understood clipboard frames (type 0) and treated the SET_CLIPBOARD acknowledgement (type 1, uint64 sequence) as unknown, resetting the buffer and desynchronising later reads. The parser is now a pure `consumeDeviceMessages` function covering both frame types, with unit tests.

## [3.0.3] - 2026-11-18

### Fixed
- The hardware integration harness spawned `dist/index.js`, an entrypoint that never existed, so `npm run test:integration` always failed with `Connection closed` and device validation could not run at all. It now spawns `dist/server.js`, matching the supported entrypoint.
- `clipboard_get` on Android 10+ requires the scrcpy transport; the ADB fallback returns opaque bytes. The integration test now runs through an active session and documents the platform limit instead of asserting the fallback.

### Added
- Hardware coverage for the UI hierarchy, element discovery, app lifecycle, rotation and screen recording, verified on a Pixel 8 (18 integration tests).

# Changelog

All notable changes to this project.

## [3.0.1] - 2026-11-13

### Changed
- Updated runtime dependencies, restored upstream notices, and synchronized canonical documentation.

## [3.0.0] - 2026-10-31

### Changed
- **Version reset to 3.0.0** — per-server version metadata baseline reset (Phase 7). All `package.json`, MCP `ServerInfo.version`, and HTTP metadata now report `3.0.0`. This is a metadata/interface baseline reset; for `hela-plastid` it is not an upgrade from the previous `4.2.0` advert.

# Changelog

## [3.0.2] - 2026-11-18

### Fixed
- Report missing host binaries and scrcpy server at startup.
- Clarify that HeLa profile restrictions override `HELA_RECEPTOR_ALLOW_SHELL`.

