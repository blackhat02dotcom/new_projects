const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// my new project

// mongo db
const cors = require('cors');  // ✅ Only one instance of this line
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


app.use(cors({
    origin: 'http://127.0.0.1:5500', // Update this if your Live Server runs on a different port
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
i am from mansa


// Middleware
app.use(cors());
app.use(bodyParser.json());

// my new projct

// Connect to MongoDB
mongoose.connect('mongodb+srv://mokshsharma007:mokshbro@cluster0.ivstc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,

    // i love my new project
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

// Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User Registered!' });
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        console.log("User not found:", username);
        return res.status(400).json({ message: 'User not found' });
    }

    console.log("Stored Hashed Password:", user.password);
    console.log("Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Password mismatch!");
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful!' });
});
//


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
