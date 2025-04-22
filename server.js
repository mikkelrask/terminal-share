const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = "1.1.1"; 

const STORAGE_DIR = path.join(__dirname, 'pastes');
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Generate a random ID for new pastas
function generateId(length = 6) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// API endpoint to create a new paste
app.post('/api/paste', (req, res) => {
  try {
    const { content, command, hostname, workingDir, syntax } = req.body;

    if (!content) {
      console.log('[ERR] No content was able to be uploaded')
      return res.status(400).json({ error: 'Content could not be uploaded' });
    }

    // Generate a unique ID
    let id = generateId();
    while (fs.existsSync(path.join(STORAGE_DIR, `${id}.json`))) {
      id = generateId();
    }

    // Store the paste data
    const pasteData = {
      content,
      command: command || 'Unknown command',
      hostname: hostname || 'unknown-host',
      workingDir: workingDir || '~',
      syntax: syntax || 'bash',
      timestamp: new Date().toISOString(),
      exitCode: req.body.exitCode || null
    };

    fs.writeFileSync(
      path.join(STORAGE_DIR, `${id}.json`),
      JSON.stringify(pasteData, null, 2)
    );

    res.json({
      id,
      url: `${req.protocol}://${req.get('host')}/${id}`,
      serverVersion: VERSION // Include server version in response
    });
  } catch (error) {
    console.error('Error creating paste:', error);
    res.status(500).json({ error: 'Failed to create paste' });
  }
});

// API endpoint to retrieve a paste
app.get('/api/paste/:id', (req, res) => {
  const { id } = req.params;
  const filePath = path.join(STORAGE_DIR, `${id}.json`);

  if (!fs.existsSync(filePath)) {
    console.log(`[WARN] Starring blank into the void - { id: '${id}' } is a 404!`)
    return res.status(404).json({ error: `Paste ${id} not found` });
  }

  try {
    const pasteData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(pasteData);
    console.log('[INFO] Success - fetched paste: ', { id })
  } catch (error) {
    console.error('[ERR] Error retrieving paste:', error);
    res.status(500).json({ error: 'Failed to retrieve paste' });
  }
});

// Route to view a paste
app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`[INFO] tshare server running on port ${PORT}\n[INFO] Waiting for requests`);
});

