// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Simple route that returns "Hello, World!"
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

module.exports = app; // Export for testing
