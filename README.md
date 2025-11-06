# Calls Queue Extension PoC

A Proof of Concept Chrome Extension demonstrating a veterinary calls queue management system with browser notification alerts and side panel integration.

## Features

- **Browser Notification Alerts**: Native Chrome notifications appear every 10 seconds to simulate incoming calls
- **Smart Notification Logic**: Only shows when side panel is closed
- **Side Panel Integration**: React-based interface opens when extension icon is clicked or notification is clicked
- **Interactive Notifications**: "Take Call" and "Ignore" buttons directly in the notification
- **Call Queue Interface**: Visual representation of waiting calls with priorities and client info
- **Modern Tech Stack**: Built with React + Vite

## How It Works

### Incoming Call Simulation

1. **Extension Icon Click**: Opens side panel directly
2. **Automatic Notifications**: Every 10 seconds, a browser notification appears showing "Incoming Call"
3. **Take Call Button**: Click notification or "Take Call" button to open side panel and stop notification cycle
4. **Ignore Button**: Dismiss notification without opening side panel
5. **Smart Detection**: When side panel is open, incoming call notifications are completely paused
6. **Auto Resume**: When side panel is closed, the 10-second notification timer restarts
7. **High Priority**: Notifications require user interaction (persistent until clicked)

### Extension Components

- **Browser Notifications**: Native Chrome notifications with branding and action buttons
- **Side Panel**: Shows call queue with client information and priorities
- **Background Script**: Manages automatic notification timing and communication between components

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Build the extension:

   ```bash
   npm run build
   ```

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked" and select the `dist` folder
   - Pin the extension to the toolbar for easy access

## Testing the Features

1. **Initial Setup**: After loading the extension, click the extension icon to see the normal popup
2. **Wait for Incoming Call**: Wait 10 seconds - the popup should automatically show an incoming call
3. **Answer Call**: Click the green phone button to open the side panel
4. **Verify Pause**: While side panel is open, no more incoming call popups should appear
5. **Close Side Panel**: Close or switch tabs to close the side panel
6. **Resume Timer**: After 10 seconds, incoming call popups should resume

## Development

Run the development server:

```bash
npm run dev
```

The extension will be built into the `dist` folder, which can be loaded into Chrome for testing.

## File Structure

```
├── public/
│   ├── manifest.json     # Extension configuration
│   ├── popup.html        # Popup interface
│   ├── popup.js          # Popup logic
│   └── icons/            # Extension icons
├── src/
│   ├── App.jsx           # Side panel React component
│   ├── App.css           # Side panel styling
│   └── main.jsx          # React entry point
├── background.js         # Service worker with timing logic
└── sidepanel.html        # Side panel HTML wrapper
```

## Technical Implementation

### Background Script Logic

- Uses `setInterval` to trigger incoming calls every 10 seconds
- Monitors side panel state via Chrome storage API
- Pauses/resumes timing based on side panel visibility

### Popup States

- **Normal State**: Shows "Calls Queue" with "Open Call Queue" button
- **Incoming Call State**: Shows animated phone icon with green answer button

### Side Panel Communication

- Detects when side panel opens/closes using visibility change events
- Sends messages to background script to control popup timing
- Displays interactive call queue with priority indicators
