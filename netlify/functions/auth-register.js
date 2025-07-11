const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Connect to database
    await connectDB();

    const { name, email, password } = JSON.parse(event.body);

    // Validate input
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Name, email and password are required' })
      };
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        statusCode: 409,
        headers,
        body: JSON.stringify({ error: 'User with this email already exists' })
      };
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await user.save();

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      })
    };

  } catch (error) {
    console.error('Register error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 