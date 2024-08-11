const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
const Goal=require('./models/Goal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

// const mongourl = 'mongodb://127.0.0.1:27017/fitness-tracker';
const mongourl = 'mongodb+srv://dhruv2516403221:DAGrzE0WT3B8laBh@cluster0.ysvcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const jwtSecret = 'viratkohli';


main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongourl);
}

// Registration Route
app.post('/api/auth/register', async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user instance
        user = new User({
            name,
            email,
            phoneNumber,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        // Send success response with the token
        res.status(201).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        // Send success response with the token
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Middleware to verify token
const verifyToken = async (req, res, next) => {
    console.log('Verify Token Middleware Called');
    const token = req.headers.authorization;

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const tokenValue = token.split(' ')[1];
        console.log('Token value:', tokenValue);
        const decoded = jwt.verify(tokenValue, jwtSecret);
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        return res.status(401).json({ message: 'Token expired or invalid' });
    }
};


// Get User Data Route
// Route to get user data
app.get('/api/user', verifyToken, async (req, res) => {
    try {
        // Find the user by the ID stored in req.user
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        
        // Return the user data
        res.json({ 
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.post('/api/goals', verifyToken, async (req, res) => {
    const { title, description, completed = false } = req.body;

    try {
        const newGoal = new Goal({
            title,
            description,
            completed, // Include completed field
            user: req.user.userId // Associate goal with the logged-in user
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get("/api/goals",verifyToken,async (req,res)=>{
    try{
        const goals=await Goal.find({user:req.user.userId});
        console.log(goals);
        res.json(goals);
    } catch(error){
        console.log(error.message);
        res.status(500).send('Server error');
    }
});

// Update a goal
app.put('/api/goals/:id', verifyToken, async (req, res) => {
    const { title, description, completed } = req.body;
    const { id } = req.params;
  
    try {
      // Find the goal by id and update it
      const updatedGoal = await Goal.findByIdAndUpdate(id, { title, description, completed }, { new: true });
      if (!updatedGoal) {
        return res.status(404).json({ msg: 'Goal not found' });
      }
      res.json(updatedGoal);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
// Delete a goal
app.delete('/api/goals/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
  
    try {
        // Find the goal by id and delete it
        const deletedGoal = await Goal.findByIdAndDelete(id);
        if (!deletedGoal) {
            return res.status(404).json({ msg: 'Goal not found' });
        }
        res.json({ msg: 'Goal deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
