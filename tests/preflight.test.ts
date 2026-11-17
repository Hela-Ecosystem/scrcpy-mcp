import { afterEach, describe, expect, it } from "vitest"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { checkPreflight } from "../src/core/preflight.js"

describe("startup pre-flight", () => {
  const previousAdbPath = process.env.ADB_PATH
  const previousServerPath = process.env.SCRCPY_SERVER_PATH
  const previousWorkingDirectory = process.cwd()

  afterEach(() => {
    if (previousAdbPath === undefined) delete process.env.ADB_PATH
    else process.env.ADB_PATH = previousAdbPath
    if (previousServerPath === undefined) delete process.env.SCRCPY_SERVER_PATH
    else process.env.SCRCPY_SERVER_PATH = previousServerPath
    process.chdir(previousWorkingDirectory)
  })

  it("reports missing binaries using the supplied PATH shim", () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), "scrcpy-preflight-"))
    try {
      const shim = path.join(directory, "adb")
      fs.writeFileSync(shim, "#!/bin/sh\nexit 0\n", { mode: 0o755 })
      process.chdir(directory)
      process.env.ADB_PATH = "adb"
      process.env.SCRCPY_SERVER_PATH = path.join(directory, "missing-server.jar")

      const status = checkPreflight(directory, process.env.SCRCPY_SERVER_PATH, null)

      expect(status.missingRequired.some((item) => item.includes("adb"))).toBe(false)

      process.env.ADB_PATH = "missing-adb"
      const missingAdb = checkPreflight(directory, process.env.SCRCPY_SERVER_PATH, null)
      expect(missingAdb.missingRequired).toContain("adb (missing-adb)")
    } finally {
      fs.rmSync(directory, { recursive: true, force: true })
    }
  })
})
