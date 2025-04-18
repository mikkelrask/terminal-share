document.addEventListener('DOMContentLoaded', function() {
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
  
  // Example: Display info about tshare
  const infoElement = document.getElementById('info');
  if (infoElement) {
    infoElement.innerHTML = `
      <h2>About tshare</h2>
      <p>A simple terminal output sharing tool with syntax highlighting.</p>
      <h3>Getting Started</h3>
      <p>Install the <code>tshare</code> client and use it to share your terminal output:</p>
      <pre><code>tshare command [args...]</code></pre>
    `;
  }
});