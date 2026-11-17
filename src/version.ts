export const SERVER_VERSION = "3.0.5"

export function resolveServerVersion(packageVersion: string | undefined): string {
  return packageVersion ?? SERVER_VERSION
}
