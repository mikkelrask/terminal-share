document.addEventListener('DOMContentLoaded', function() {
  const pasteId = window.location.pathname.substring(1);
  
  if (!pasteId) {
    showError('No paste ID provided');
    return;
  }
  
  fetch(`/api/paste/${pasteId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Paste not found');
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('user-host').textContent = data.hostname || 'user@host';
      document.getElementById('working-dir').textContent = data.workingDir || '~';
      document.getElementById('command').textContent = `$ ${data.command || 'unknown command'}`;
      
      // Set exit code badge with appropriate styling
      const exitCodeBadge = document.getElementById('exit-code-badge');
      const exitCode = data.exitCode !== null ? data.exitCode : '?';
      exitCodeBadge.textContent = `${exitCode}`;
      
      // Add error class for non-zero exit codes
      if (exitCode !== '0' && exitCode !== 0) {
        exitCodeBadge.classList.add('error');
      }
      
      const outputEl = document.getElementById('output');
      outputEl.textContent = data.content;
      
      // Set the syntax highlighting class, default to bash if not specified
      const syntax = data.syntax || 'bash';
      outputEl.className = syntax;
      
      // Display the detected syntax in the badge
      document.getElementById('syntax-badge').textContent = syntax;
      
      const date = new Date(data.timestamp);
      document.getElementById('timestamp').textContent = `Created: ${date.toLocaleString()}`;
      
      // Apply syntax highlighting
      hljs.highlightElement(outputEl);
      
      document.getElementById('loading').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      
      document.title = `tshare: ${data.command || 'Shared Terminal Output'}`;
    })
    .catch(error => {
      showError(error.message);
    });
  
  document.getElementById('theme-selector').addEventListener('change', function(e) {
    const theme = e.target.value;
    document.getElementById('highlight-theme').href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${theme}.css`;
  });
});

function showError(message) {
  document.getElementById('loading').style.display = 'none';
  const errorEl = document.getElementById('error');
  errorEl.textContent = message || 'An error occurred';
  errorEl.style.display = 'block';
}