# Stores Page Setup Guide

## Issue
The stores page cannot load data from the database. This is likely due to missing or incorrect environment variables.

## Solution

### 1. Set up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifewood?retryWrites=true&w=majority

# JWT Secret (for admin authentication)
JWT_SECRET=your-super-secret-jwt-key-here

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 2. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free tier is fine)
3. Create a database user with read/write permissions
4. Get your connection string from Database > Connect
5. Replace `username`, `password`, and `cluster` in the MONGODB_URI

### 3. Test Database Connection

Run the development server and visit:
- `http://localhost:3000/api/test-db` - Test database connectivity
- `http://localhost:3000/api/stores` - Test stores API

### 4. Add Sample Data

You can add sample stores through the admin panel or directly in MongoDB:

```javascript
// Sample store data
{
  "name": "PT. Life Wood Indonesia - Main Office",
  "address": "Jl. Sultan Hadlirin KM.02 Ds. Langon RT.11 RW.05",
  "city": "Jepara",
  "phone": "0812-2744-4678",
  "image": "/images/lifewood.png",
  "location": {
    "lat": -6.5885,
    "lng": 110.6684
  }
}
```

### 5. Development Fallback

If the database is not configured, the page will show sample data in development mode.

### 6. Production Deployment

For production (Netlify/Vercel), make sure to:
1. Set environment variables in your hosting platform
2. Deploy the Netlify functions (if using Netlify)
3. Test the production API endpoints

### 7. Troubleshooting

Check the browser console and server logs for:
- Database connection errors
- API endpoint errors
- Environment variable issues

Common issues:
- Missing MONGODB_URI environment variable
- Incorrect MongoDB connection string
- Network connectivity issues
- CORS issues (should be resolved with the updated code)

### 8. API Endpoints

- **Development**: `/api/stores`
- **Production (Netlify)**: `/.netlify/functions/stores`
- **Database Test**: `/api/test-db`

The stores page will automatically detect the environment and use the appropriate endpoint. 