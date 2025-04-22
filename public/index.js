document.addEventListener('DOMContentLoaded', function() { // Make async for userAgentData
  // Add any home page specific JavaScript here
  
  // Example: Form handling for direct navigation to a paste
  const pasteForm = document.getElementById('paste-form');
  if (pasteForm) {
    pasteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const pasteId = document.getElementById('paste-id').value.trim();
      if (pasteId) {
        window.location.href = `/${pasteId}`;
      }
    });
  }


  // Call the async function to update the install command
  updateInstallCommandExample();
});

// Separate async function to handle OS detection and DOM update
async function updateInstallCommandExample() {
  console.log("Attempting to update install command example..."); // Log start
  const installCommandElement = document.getElementById('install-command-example');
  if (!installCommandElement) {
    console.error('Install command example element (#install-command-example) not found'); // Log error if element missing
    return;
  }

  let isMac = false;
  if (navigator.userAgentData) {
    try {
      // Check if running in a secure context (required for getHighEntropyValues)
      if (!window.isSecureContext) {
        console.warn('Not running in a secure context (HTTPS). Cannot use userAgentData. Assuming non-macOS.');
      } else {
        console.log("Using userAgentData for OS detection."); // Log detection method
        const uaData = await navigator.userAgentData.getHighEntropyValues(["platform"]);
        console.log("Detected platform:", uaData.platform); // Log detected platform
        isMac = uaData.platform === "macOS";
      }
    } catch (error) {
      console.warn('Could not determine platform using userAgentData:', error);
      // Assume non-macOS if detection fails
    }
  } else {
    console.warn('navigator.userAgentData not supported, assuming non-macOS for install command example.');
    // Assume non-macOS if API is not supported
  }
  
  console.log(`OS detected as macOS: ${isMac}`); // Log final OS decision
  
  const installUrl = 'https://raw.githubusercontent.com/mikkelrask/terminal-share/refs/heads/main/tshare';
  let cmdText;
  if (isMac) {
    // macOS: Use sudo and /usr/local/bin
    cmdText = `sudo curl -o /usr/local/bin/tshare ${installUrl}\nsudo chmod +x /usr/local/bin/tshare`;
  } else {
    // Other OS (Linux assumed): Use ~/.local/bin without sudo
    cmdText = `curl -o ~/.local/bin/tshare ${installUrl}\nchmod +x ~/.local/bin/tshare`;
  }
  console.log("Setting install command example text to:", cmdText); // Log the command text being set
  installCommandElement.textContent = cmdText;
}
