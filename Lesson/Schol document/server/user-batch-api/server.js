const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phone: String,
  role: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// ✅ Batch upload endpoint
app.post('/api/users/batch', async (req, res) => {
  try {
    const users = req.body;

    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'Expected an array of users' });
    }

    // Optional: validate each user
    const validRoles = ['admin', 'sale', 'user'];
    const filtered = users.filter(u => validRoles.includes(u.role));

    const result = await User.insertMany(filtered);
    res.status(200).json({ message: `${result.length} users saved.` });
  } catch (err) {
    console.error('Batch upload error:', err);
    res.status(500).json({ error: 'Server error during batch upload' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});