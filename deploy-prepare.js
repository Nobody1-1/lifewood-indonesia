#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing for Vercel Deployment...');
console.log('');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.log('❌ Please run this script from the project root directory');
  process.exit(1);
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run lint to check for errors
  console.log('');
  console.log('🔍 Running lint check...');
  execSync('npm run lint', { stdio: 'inherit' });
  
  // Build the project
  console.log('');
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Build successful!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Commit your changes:');
  console.log('   git add .');
  console.log('   git commit -m "Fix build errors for Vercel deployment"');
  console.log('   git push');
  console.log('');
  console.log('2. Deploy to Vercel:');
  console.log('   - Go to https://vercel.com');
  console.log('   - Import your GitHub repository');
  console.log('   - Set environment variables');
  console.log('   - Deploy!');
  console.log('');
  console.log('🔗 Environment variables needed:');
  console.log('   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lifewood?retryWrites=true&w=majority');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key');
  console.log('   JWT_SECRET=your-super-secret-jwt-key-here');
  
} catch (error) {
  console.log('');
  console.log('❌ Build failed! Please fix the errors above before deploying.');
  console.log('');
  console.log('💡 Common fixes:');
  console.log('   - Fix TypeScript errors');
  console.log('   - Remove unused imports');
  console.log('   - Fix ESLint warnings');
  process.exit(1);
} 