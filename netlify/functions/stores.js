const mongoose = require('mongoose');

// MongoDB connection
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB already connected');
      return;
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
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
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
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
    console.log('Stores function called with method:', event.httpMethod);
    
    // Connect to database
    await connectDB();

    if (event.httpMethod === 'GET') {
      console.log('Fetching all stores...');
      
      // Get all stores
      const stores = await Store.find({}).sort({ createdAt: -1 });
      console.log(`Found ${stores.length} stores`);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(stores)
      };
    }

    if (event.httpMethod === 'POST') {
      console.log('Creating new store...');
      
      // Create new store
      const storeData = JSON.parse(event.body);
      console.log('Store data:', storeData);
      
      const store = new Store(storeData);
      await store.save();
      
      console.log('Store created successfully:', store._id);
      
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
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      })
    };
  }
}; 