const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Use a different port to avoid conflict with the main backend

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  console.log('Register request received:', req.body);
  res.status(200).json({ message: 'Registration successful (test)! ', data: req.body });
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route working in test-backend!' });
});

app.listen(PORT, () => {
  console.log(`Test backend running on http://localhost:${PORT}`);
});
