#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧪 Testing build locally...');
console.log('');

try {
  // Clean previous build
  console.log('🧹 Cleaning previous build...');
  execSync('rm -rf .next', { stdio: 'inherit' });
  
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run build
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Build successful! Ready for deployment.');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('1. Commit changes: git add . && git commit -m "Fix build errors"');
  console.log('2. Push to GitHub: git push');
  console.log('3. Deploy to Vercel');
  
} catch (error) {
  console.log('');
  console.log('❌ Build failed! Check the errors above.');
  process.exit(1);
} 