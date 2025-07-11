const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Store Schema
const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

const Store = mongoose.models.Store || mongoose.model('Store', storeSchema);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Connect to database
    await connectDB();

    if (event.httpMethod === 'GET') {
      // Get all stores
      const stores = await Store.find({}).sort({ createdAt: -1 });
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stores)
      };
    }

    if (event.httpMethod === 'POST') {
      // Create new store
      const storeData = JSON.parse(event.body);
      const store = new Store(storeData);
      await store.save();
      
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(store)
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };

  } catch (error) {
    console.error('Stores API error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 