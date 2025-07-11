#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up environment variables for Lifewood Indonesia');
console.log('');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local already exists');
} else {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# MongoDB Atlas
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifewood?retryWrites=true&w=majority

    # Supabase
    NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

    # JWT Secret
    JWT_SECRET=your-super-secret-jwt-key-here
    `;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully');
}

console.log('');
console.log('📋 Next steps:');
console.log('1. Update .env.local with your actual values');
console.log('2. For MongoDB Atlas:');
console.log('   - Create cluster at https://cloud.mongodb.com');
console.log('   - Get connection string from Database > Connect');
console.log('3. For Supabase:');
console.log('   - Create project at https://supabase.com');
console.log('   - Get URL and keys from Settings > API');
console.log('4. Generate a secure JWT_SECRET');
console.log('');
console.log('🔗 Useful links:');
console.log('- MongoDB Atlas: https://cloud.mongodb.com');
console.log('- Supabase: https://supabase.com');
console.log('- Vercel: https://vercel.com'); 