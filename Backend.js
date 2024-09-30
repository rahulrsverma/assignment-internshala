

const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const app = express();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  // Example of interacting with an external image manipulation API (Cloudinary or similar)
  if (file.mimetype.startsWith('image')) {
    const apiUrl = 'https://api.example.com/image-manipulate';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imagePath: file.path,
      }),
    });
    const result = await response.json();
    return res.json({ message: 'Image manipulated successfully', result });
  }

  res.json({ message: 'File uploaded successfully', file });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

