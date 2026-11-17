import fs from "node:fs"
import path from "node:path"

export interface PreflightStatus {
  missingRequired: string[]
  missingOptional: string[]
}

function executableExists(binary: string, pathValue: string): boolean {
  if (binary.includes(path.sep)) {
    try {
      fs.accessSync(binary, fs.constants.X_OK)
      return true
    } catch {
      return false
    }
  }
  return pathValue.split(path.delimiter).some((directory) => {
    try {
      fs.accessSync(path.join(directory || ".", binary), fs.constants.X_OK)
      return true
    } catch {
      return false
    }
  })
}

export function checkPreflight(
  pathValue = process.env.PATH ?? "",
  serverPath = process.env.SCRCPY_SERVER_PATH,
  ffmpegStaticPath: string | null = null,
): PreflightStatus {
  const missingRequired: string[] = []
  const missingOptional: string[] = []
  const adbPath = process.env.ADB_PATH || "adb"
  if (!executableExists(adbPath, pathValue)) missingRequired.push(`adb (${adbPath})`)

  const serverCandidates = [
    serverPath,
    "/usr/local/lib/scrcpy-v4.0/scrcpy-server",
    "/usr/local/share/scrcpy/scrcpy-server",
    "/usr/share/scrcpy/scrcpy-server",
    "/opt/scrcpy/scrcpy-server",
    path.join(process.cwd(), "scrcpy-server"),
  ].filter((candidate): candidate is string => Boolean(candidate))
  if (!serverCandidates.some((candidate) => fs.existsSync(candidate))) {
    missingRequired.push(`scrcpy-server.jar (set SCRCPY_SERVER_PATH; searched ${serverCandidates.join(", ")})`)
  }

  const ffmpeg = process.env.FFMPEG_PATH || ffmpegStaticPath || "ffmpeg"
  if (!executableExists(ffmpeg, pathValue)) missingOptional.push(`ffmpeg (${ffmpeg})`)
  const ffplay = process.env.FFPLAY_PATH || "ffplay"
  if (!executableExists(ffplay, pathValue)) missingOptional.push(`ffplay (${ffplay})`)
  return { missingRequired, missingOptional }
}
