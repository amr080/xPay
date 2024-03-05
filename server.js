 const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // A mongoose model for the User

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/xpay', { useNewUrlParser: true, useUnifiedTopology: true });

// POST endpoint to create a new user
app.post('/users', async (req, res) => {
    try {
        const { username, wallet_address } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ wallet_address });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }

        // Create a new user
        const user = new User({ username, wallet_address });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
