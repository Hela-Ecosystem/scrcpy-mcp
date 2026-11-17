import packageJson from "../package.json"
import { resolveServerVersion, SERVER_VERSION } from "../src/version.js"
import { describe, expect, it } from "vitest"

describe("advertised server version", () => {
  it("keeps the fallback constant aligned with package.json", () => {
    expect(SERVER_VERSION).toBe(packageJson.version)
    expect(resolveServerVersion(undefined)).toBe(packageJson.version)
  })

  it("preserves npm's package version when available", () => {
    expect(resolveServerVersion("9.8.7")).toBe("9.8.7")
  })
})
