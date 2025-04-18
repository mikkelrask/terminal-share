// Common functionality shared across pages

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality - for dark/light mode
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Set up the theme toggle button
    themeToggleBtn.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
  
  // Copy button functionality
  const copyBtn = document.getElementById('copy-cmd');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      const cmd = 'curl -o /usr/local/bin/tshare https://raw.githubusercontent.com/mikkelrask/terminal-share/main/tshare && chmod +x /usr/local/bin/tshare';
      navigator.clipboard.writeText(cmd).then(() => {
        showToast('Install command copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy command');
      });
    });
  }
});

// Set theme (dark or light)
function setTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.innerHTML = '☀️';
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.innerHTML = '🌙';
  }
}

// Show a toast notification
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }
}