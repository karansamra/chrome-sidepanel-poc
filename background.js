let incomingCallInterval = null;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "sidePanel") {
    console.log("Side panel connected (opened)");
    if (incomingCallInterval) {
      clearInterval(incomingCallInterval);
      incomingCallInterval = null;
    }
    port.onDisconnect.addListener(() => {
      console.log("Side panel closed / tab closed");
      startIncomingCallLogic();
      // Cleanup tasks here
    });
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  console.log("Extension installed.");

  // Set side panel to open on action click
  await chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

  startIncomingCallLogic();
});

// Handle extension icon click - open side panel
chrome.action.onClicked.addListener(async (tab) => {
  console.log("Extension icon clicked");
  try {
    await chrome.sidePanel.open({ tabId: tab.id });
    console.log("Side panel opened");
  } catch (error) {
    console.error("Error opening side panel:", error);
  }
});

// Function to start incoming call logic
function startIncomingCallLogic() {
  // Clear any existing interval
  if (incomingCallInterval) {
    clearInterval(incomingCallInterval);
  }

  // Start new interval - trigger incoming call every 10 seconds
  incomingCallInterval = setInterval(async () => {
    const result = await chrome.storage.local.get(["sidePanelOpen"]);
    const sidePanelOpenStored = result.sidePanelOpen || false;

    // Only show incoming call notification if side panel is not open
    if (!sidePanelOpenStored) {
      console.log("Creating incoming call notification!");
      await createIncomingCallNotification();
    }
  }, 20000); // 20 seconds
}

// Function to create incoming call notification
async function createIncomingCallNotification() {
  // Clear any existing notifications first
  await clearAllIncomingCallNotifications();

  // Generate unique ID to avoid conflicts
  const uniqueId = "incoming-call-" + Date.now();

  // Create the notification with unique ID
  const notificationId = await chrome.notifications.create(uniqueId, {
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: "Guardian Vets - Incoming Call",
    message: "Emergency consultation from pet owner",
    contextMessage: "Priority call waiting in queue",
    requireInteraction: true, // Keep notification visible until user interacts
    priority: 2, // High priority
  });

  console.log("Notification created with unique ID:", notificationId);
}

// Helper function to clear all incoming call notifications
async function clearAllIncomingCallNotifications() {
  try {
    // Get all notifications and clear incoming call ones
    const notifications = await chrome.notifications.getAll();
    for (const id in notifications) {
      if (id.startsWith("incoming-call")) {
        await chrome.notifications.clear(id);
        console.log("Cleared notification:", id);
      }
    }
  } catch (error) {
    console.error("Error clearing notifications:", error);
  }
}

// Side panel events are now handled by chrome.sidePanel API events
