#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🖼️  Image Optimization Check for Lifewood Indonesia');
console.log('');

const imagesDir = path.join(__dirname, 'public', 'images');
const imageFiles = [];

// Scan for image files
function scanImages(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanImages(filePath);
    } else if (isImageFile(file)) {
      const size = stat.size;
      const sizeInMB = (size / (1024 * 1024)).toFixed(2);
      imageFiles.push({
        name: file,
        path: filePath,
        size: size,
        sizeInMB: sizeInMB
      });
    }
  });
}

function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

if (fs.existsSync(imagesDir)) {
  scanImages(imagesDir);
  
  console.log(`📊 Found ${imageFiles.length} image files:`);
  console.log('');
  
  let totalSize = 0;
  const largeImages = [];
  
  imageFiles.forEach(file => {
    console.log(`  ${file.name} - ${file.sizeInMB} MB`);
    totalSize += file.size;
    
    if (file.size > 1024 * 1024) { // > 1MB
      largeImages.push(file);
    }
  });
  
  console.log('');
  console.log(`📈 Total size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
  
  if (largeImages.length > 0) {
    console.log('');
    console.log('⚠️  Large images detected (>1MB):');
    largeImages.forEach(file => {
      console.log(`  - ${file.name} (${file.sizeInMB} MB)`);
    });
    console.log('');
    console.log('💡 Recommendations:');
    console.log('  - Consider compressing large images');
    console.log('  - Use WebP format for better compression');
    console.log('  - Consider lazy loading for better performance');
  }
  
  console.log('');
  console.log('✅ Images are ready for deployment');
  console.log('📝 Note: These images will be included in your GitHub repository');
  console.log('   For production, consider using Supabase Storage for dynamic images');
  
} else {
  console.log('❌ Images directory not found');
}

console.log('');
console.log('🔗 Next steps:');
console.log('1. Review large images and consider optimization');
console.log('2. Push to GitHub: git add . && git commit -m "Add images" && git push');
console.log('3. Deploy to Vercel with environment variables'); 