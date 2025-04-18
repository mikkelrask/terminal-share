document.addEventListener('DOMContentLoaded', async function() {
  const pasteId = getPasteId();
  
  if (pasteId) {
    try {
      await loadPaste(pasteId);
    } catch (error) {
      showError('Failed to load paste: ' + error.message);
    }
  } else {
    showError('No paste ID provided');
  }
  
  // Set up theme selector
  document.getElementById('theme-selector').addEventListener('change', function() {
    changeTheme(this.value);
  });
  
  // Load saved theme preference
  const savedTheme = localStorage.getItem('preferredTheme');
  if (savedTheme) {
    document.getElementById('theme-selector').value = savedTheme;
    changeTheme(savedTheme);
  }
});

function getPasteId() {
  const path = window.location.pathname;
  const segments = path.split('/');
  return segments[segments.length - 1];
}

async function loadPaste(pasteId) {
  showLoading(true);
  
  try {
    const response = await fetch(`/api/paste/${pasteId}`);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    
    // Display the paste content
    document.getElementById('output').textContent = data.content;
    document.getElementById('user-host').textContent = data.hostname || 'unknown';
    document.getElementById('working-dir').textContent = data.workingDir || '~';
    document.getElementById('command').textContent = `$ ${data.command || ''}`;
    document.getElementById('exit-code-badge').textContent = data.exitCode || '0';
    document.getElementById('exit-code-badge').classList.toggle('error', data.exitCode !== '0');
    
    // Set syntax badge and apply highlighting
    const syntax = data.syntax || 'bash'; // Default to bash if not specified
    document.getElementById('syntax-badge').textContent = syntax;
    
    // Apply syntax highlighting unless set to 'none'
    if (syntax !== 'none') {
      // For additional languages, ensure they're loaded
      if (!hljs.getLanguage(syntax) && syntax !== 'auto') {
        console.warn(`Language '${syntax}' not available, falling back to auto detection`);
        hljs.highlightElement(document.getElementById('output'));
      } else {
        hljs.highlightElement(document.getElementById('output'), {
          language: syntax === 'none' ? null : syntax
        });
      }
    }
    
    // Set timestamp if available
    if (data.timestamp) {
      const date = new Date(data.timestamp);
      document.getElementById('timestamp').textContent = `Shared on ${formatDate(date)}`;
    }
    
    showContent();
  } catch (error) {
    console.error('Error loading paste:', error);
    showError(`Failed to load paste: ${error.message}`);
  } finally {
    showLoading(false);
  }
}

function formatDate(date) {
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function showLoading(show) {
  document.getElementById('loading').style.display = show ? 'flex' : 'none';
}

function showContent() {
  document.getElementById('content').style.display = 'block';
}

function showError(message) {
  const errorElement = document.getElementById('error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  showLoading(false);
}

function changeTheme(theme) {
  const link = document.getElementById('highlight-theme');
  link.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/${theme}.min.css`;
  localStorage.setItem('preferredTheme', theme);
}