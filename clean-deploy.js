#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🧹 Clean Deployment for Lifewood Indonesia');
console.log('');

try {
  // Remove node_modules and package-lock.json
  console.log('🗑️  Cleaning previous installation...');
  execSync('rm -rf node_modules package-lock.json .next', { stdio: 'inherit' });
  
  // Fresh install
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Test build
  console.log('🏗️  Testing build...');
  execSync('npm run build:no-lint', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Build successful! Ready for deployment.');
  console.log('');
  console.log('🚀 Next steps:');
  console.log('1. Commit changes: git add . && git commit -m "Remove Leaflet dependencies"');
  console.log('2. Push to GitHub: git push');
  console.log('3. Deploy to Vercel');
  
} catch (error) {
  console.log('');
  console.log('❌ Build failed! Check the errors above.');
  process.exit(1);
} 