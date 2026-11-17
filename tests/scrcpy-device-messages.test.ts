import { describe, it, expect } from "vitest"
import { consumeDeviceMessages } from "../src/core/scrcpy.js"
import { DEVICE_MSG_TYPE_CLIPBOARD, DEVICE_MSG_TYPE_ACK_CLIPBOARD } from "../src/core/constants.js"

const clipboardFrame = (text: string) => {
  const payload = Buffer.from(text, "utf8")
  const header = Buffer.alloc(5)
  header.writeUInt8(DEVICE_MSG_TYPE_CLIPBOARD, 0)
  header.writeUInt32BE(payload.length, 1)
  return Buffer.concat([header, payload])
}

const ackFrame = (sequence: bigint) => {
  const frame = Buffer.alloc(9)
  frame.writeUInt8(DEVICE_MSG_TYPE_ACK_CLIPBOARD, 0)
  frame.writeBigUInt64BE(sequence, 1)
  return frame
}

describe("device message stream", () => {
  it("parses a clipboard frame", () => {
    const parsed = consumeDeviceMessages(clipboardFrame("hello"))
    expect(parsed.clipboard).toEqual(["hello"])
    expect(parsed.rest.length).toBe(0)
    expect(parsed.reset).toBe(false)
  })

  it("consumes a SET_CLIPBOARD acknowledgement instead of resetting the buffer", () => {
    const parsed = consumeDeviceMessages(ackFrame(7n))
    expect(parsed.acks).toEqual([7])
    expect(parsed.reset).toBe(false)
    expect(parsed.rest.length).toBe(0)
  })

  it("keeps a partial frame for the next read", () => {
    const frame = clipboardFrame("partial")
    const parsed = consumeDeviceMessages(frame.subarray(0, frame.length - 2))
    expect(parsed.clipboard).toEqual([])
    expect(parsed.rest.length).toBe(frame.length - 2)
  })

  it("parses interleaved clipboard and ack frames without loss", () => {
    const stream = Buffer.concat([ackFrame(1n), clipboardFrame("first"), ackFrame(2n), clipboardFrame("second")])
    const parsed = consumeDeviceMessages(stream)
    expect(parsed.clipboard).toEqual(["first", "second"])
    expect(parsed.acks).toEqual([1, 2])
    expect(parsed.rest.length).toBe(0)
  })

  it("resets on an oversized clipboard payload", () => {
    const parsed = consumeDeviceMessages(clipboardFrame("x".repeat(32)), 8)
    expect(parsed.reset).toBe(true)
    expect(parsed.clipboard).toEqual([])
  })
})
