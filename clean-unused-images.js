#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning Unused Images for Lifewood Indonesia');
console.log('');

// Images yang digunakan dalam website (berdasarkan analisis kode)
const usedImages = [
  'lifewood.png',
  'pic0.jpeg',
  'pic1.jpeg', 
  'pic2.jpeg',
  'pixabay.jpg',
  'furniture.jpg',
  'store-placeholder.jpg' // Referenced in stores page
];

// Images yang ada di folder
const imagesDir = path.join(__dirname, 'public', 'images');
const existingImages = [];

if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir);
  
  files.forEach(file => {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile() && isImageFile(file)) {
      const sizeInMB = (stat.size / (1024 * 1024)).toFixed(2);
      existingImages.push({
        name: file,
        path: filePath,
        size: stat.size,
        sizeInMB: sizeInMB,
        isUsed: usedImages.includes(file)
      });
    }
  });
  
  console.log('📊 Analysis Results:');
  console.log('');
  
  const usedFiles = existingImages.filter(img => img.isUsed);
  const unusedFiles = existingImages.filter(img => !img.isUsed);
  
  console.log(`✅ Used Images (${usedFiles.length}):`);
  usedFiles.forEach(img => {
    console.log(`  - ${img.name} (${img.sizeInMB} MB)`);
  });
  
  console.log('');
  console.log(`🗑️  Unused Images (${unusedFiles.length}):`);
  unusedFiles.forEach(img => {
    console.log(`  - ${img.name} (${img.sizeInMB} MB)`);
  });
  
  console.log('');
  
  const totalUsedSize = usedFiles.reduce((sum, img) => sum + img.size, 0);
  const totalUnusedSize = unusedFiles.reduce((sum, img) => sum + img.size, 0);
  
  console.log(`📈 Size Summary:`);
  console.log(`  Used: ${(totalUsedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Unused: ${(totalUnusedSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Total: ${((totalUsedSize + totalUnusedSize) / (1024 * 1024)).toFixed(2)} MB`);
  
  if (unusedFiles.length > 0) {
    console.log('');
    console.log('💾 Space that can be saved:', (totalUnusedSize / (1024 * 1024)).toFixed(2), 'MB');
    
    console.log('');
    console.log('❓ Do you want to delete unused images? (y/n)');
    
    // Simulate user input for demo - in real usage, you'd use readline
    const shouldDelete = process.argv.includes('--delete');
    
    if (shouldDelete) {
      console.log('');
      console.log('🗑️  Deleting unused images...');
      
      unusedFiles.forEach(img => {
        try {
          fs.unlinkSync(img.path);
          console.log(`  ✅ Deleted: ${img.name}`);
        } catch (error) {
          console.log(`  ❌ Failed to delete: ${img.name} - ${error.message}`);
        }
      });
      
      console.log('');
      console.log('✅ Cleanup completed!');
      console.log(`💾 Saved ${(totalUnusedSize / (1024 * 1024)).toFixed(2)} MB of space`);
      
    } else {
      console.log('');
      console.log('💡 To delete unused images, run:');
      console.log('   node clean-unused-images.js --delete');
      console.log('');
      console.log('⚠️  Warning: This action cannot be undone!');
    }
  } else {
    console.log('');
    console.log('✅ No unused images found! All images are being used.');
  }
  
} else {
  console.log('❌ Images directory not found');
}

function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

console.log('');
console.log('📋 Summary of used images:');
console.log('  - lifewood.png: Logo used in navbar, homepage, and admin');
console.log('  - pic0.jpeg, pic1.jpeg, pic2.jpeg: Brand page carousel');
console.log('  - pixabay.jpg: Brand page content');
console.log('  - furniture.jpg: Brand page content');
console.log('  - store-placeholder.jpg: Fallback for store images'); 