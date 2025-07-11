#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing deployment to Netlify...');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  execSync('rm -rf .next', { stdio: 'inherit' });
} catch (error) {
  console.log('No .next directory to clean');
}

// Install dependencies
console.log('📦 Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Build the project
console.log('🔨 Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Check if build was successful
if (fs.existsSync('.next')) {
  console.log('✅ Build successful!');
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Connect your repository to Netlify');
  console.log('3. Set build command: npm run build');
  console.log('4. Set publish directory: .next');
  console.log('5. Add environment variables in Netlify dashboard');
  console.log('');
  console.log('🌐 Your Netlify site will be deployed automatically!');
} else {
  console.error('❌ Build failed!');
  process.exit(1);
} 