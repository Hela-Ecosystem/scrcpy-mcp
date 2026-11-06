# HeLa Receptor: canonical tools

Server version **3.0.0**. Generated from the ecosystem schema catalog; regenerate with `npm run docs:generate -- --servers` in the ecosystem checkout.

Only names advertised by `tools/list` are listed here. Older aliases in migration examples are not additional tools. Runtime namespace prefixes are optional and do not change these server-local names.

## `app_current`

Get the currently foregrounded app package name and activity.

## `app_install`

Install an APK file on the device from the host machine.

## `app_list`

List installed packages on the device. Optionally filter by name or restrict to system/third-party apps. Use to find package names for app_start.

## `app_start`

Launch an app by package name. PREFERRED over swiping the app drawer / manual UI navigation. Uses scrcpy START_APP (fast) when session is active, falls back to ADB `am start`. Supports force-stop prefix (+).

## `app_stop`

Force-stop an app on the device.

## `app_uninstall`

Uninstall an app from the device.

## `clipboard_get`

Get the current clipboard content from the device. Uses scrcpy GET_CLIPBOARD when a session is active (works on Android 10+), falls back to ADB clipboard commands.

## `clipboard_set`

Set the clipboard content on the device. Uses scrcpy SET_CLIPBOARD when a session is active (with optional paste flag), falls back to ADB clipboard commands.

## `collapse_panels`

Collapse all open panels (notification, settings) (requires active scrcpy session)

## `connect_wifi`

Enable WiFi ADB and connect to the device wirelessly. Returns the connection address.

## `device_info`

Get detailed info about a device: model, Android version, screen size, SDK level, battery level

## `device_list`

List all connected Android devices with their serial numbers, state, and model

## `disconnect_wifi`

Disconnect from a wireless ADB device

## `drag_drop`

Perform a drag and drop gesture from one point to another. Uses input draganddrop on Android 8.0+ (API 26), falls back to swipe on older versions.

## `expand_notifications`

Expand the notification panel (requires active scrcpy session)

## `expand_settings`

Expand the quick settings panel (requires active scrcpy session)

## `file_list`

List directory contents on the device.

## `file_pull`

Pull a file from the device to the host machine.

## `file_push`

Push a file from the host machine to the device.

## `form_fill`

Fill a multi-field form. Provide an array of {label, value} pairs. For each pair, finds the nearest input field to the label text, taps it, and types the value. Handles checkboxes and dropdowns by label matching.

## `input_text`

Type text into the input field. Reports device context (screen, app, session). When submit=true, auto-detects and taps the send button. Optionally target a specific input field by text label, resource ID, or content description instead of auto-focus.

## `key_event`

Send a key event to the device. Supports keycodes like HOME, BACK, ENTER, VOLUME_UP, etc.

## `long_press`

Perform a long press at the specified coordinates

## `rotate_device`

Rotate the device screen (requires active scrcpy session)

## `screen_off`

Turn the device screen off

## `screen_on`

Wake the device screen (turn screen on)

## `screen_record_start`

Start recording the screen. Recording continues until screen_record_stop is called.

## `screen_record_stop`

Stop screen recording and optionally pull the file to the host.

## `screenshot`

Take a screenshot of the Android device screen. Returns the image as base64.

## `scroll`

Scroll at the specified position. dy=negative scrolls UP (reveals content above), dy=positive scrolls DOWN (reveals content below). Use large values (e.g. -400, 500) for meaningful scroll distance.

## `scroll_to_element`

Scroll the page to bring a specific UI element into view. Tries to find the element by text, then swipes up/down until it becomes visible or timeout is reached.

## `shell_exec`

Execute an arbitrary ADB shell command on the device and return the output. Use this for any device operation not covered by other tools.

## `start_session`

Start a scrcpy session for fast input control and screenshots. When a session is active, tap/swipe/text/screenshot are 10-50x faster. Requires scrcpy-server to be installed.

## `start_video_stream`

Start an HTTP MJPEG video stream of the device screen and open a viewer window (ffplay). Starts a scrcpy session automatically if needed.

## `stop_session`

Stop the active scrcpy session. Tools will fall back to ADB commands.

## `stop_video_stream`

Stop the HTTP MJPEG video stream and close the viewer window for a device.

## `swipe`

Perform a swipe gesture from one point to another

## `tap`

Tap at the specified screen coordinates

## `ui_dump`

Dump the full UI hierarchy of the current screen as XML.

## `ui_find_element`

Find UI elements on screen by text, resource ID, class name, or content description. Returns matching elements with their tap coordinates.

## `ui_get_state`

Dump the UI and return a clean Markdown-like tree of visible and clickable elements with viewport coordinates. NOTE: WebView elements may report identical y-coordinates when scrolled; use scroll_to_element first to bring target fields into view.

## `ui_smart_fill`

Find a UI element, tap it, inject text, and optionally press ENTER. Smartly finds the nearest input field when targeting a label.

## `ui_tap_element`

Find a UI element by text, resource ID, class name, or content description, and immediately tap it. Smartly finds the nearest input field when targeting a label.

## `ui_wait_for_element`

Wait for a UI element to appear on screen. Polls the UI until the element matches criteria or timeout is reached.

## `version`

Report which scrcpy version is being used by the MCP server. The version is detected from the SCRCPY_SERVER_VERSION environment variable, the scrcpy --version binary, or a built-in default.

## `wait`

Wait for a specified number of milliseconds. Use between actions to wait for animations, page loads, or network responses.
