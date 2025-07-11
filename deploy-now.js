#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🚀 Deploying Lifewood Indonesia to Vercel...');
console.log('');

try {
  // Add all changes
  console.log('📝 Adding changes...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit changes
  console.log('💾 Committing changes...');
  execSync('git commit -m "Fix SSR error - convert stores page to server-side rendering"', { stdio: 'inherit' });
  
  // Push to GitHub
  console.log('📤 Pushing to GitHub...');
  execSync('git push', { stdio: 'inherit' });
  
  console.log('');
  console.log('✅ Changes pushed successfully!');
  console.log('');
  console.log('🔗 Next steps:');
  console.log('1. Go to Vercel dashboard');
  console.log('2. Your project should auto-deploy');
  console.log('3. Set environment variables if not done yet:');
  console.log('   - MONGODB_URI');
  console.log('   - NEXT_PUBLIC_SUPABASE_URL');
  console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('   - JWT_SECRET');
  console.log('');
  console.log('🎉 Deployment should be successful now!');
  
} catch (error) {
  console.log('');
  console.log('❌ Error during deployment:', error.message);
  process.exit(1);
} 