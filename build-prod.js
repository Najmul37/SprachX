import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const indexHtmlPath = path.resolve('index.html');
const indexHtmlDevPath = path.resolve('index.html.dev');
const distPath = path.resolve('dist');
const rootAssetsPath = path.resolve('assets');

try {
  // 1. Read current index.html
  let indexContent = '';
  if (fs.existsSync(indexHtmlPath)) {
    indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  }

  // 2. Manage backup and restore of development index.html
  if (indexContent.includes('/src/main.tsx')) {
    // Current index.html is the development version. Save/update the backup.
    fs.writeFileSync(indexHtmlDevPath, indexContent, 'utf8');
    console.log('Saved development index.html template to index.html.dev');
  } else if (fs.existsSync(indexHtmlDevPath)) {
    // Current index.html is the production version. Restore the development version first.
    console.log('Restoring development index.html from backup before building...');
    const devContent = fs.readFileSync(indexHtmlDevPath, 'utf8');
    fs.writeFileSync(indexHtmlPath, devContent, 'utf8');
  } else {
    throw new Error('Could not find development index.html or backup file index.html.dev!');
  }

  // 3. Run the official Vite production build
  console.log('Running Vite production build...');
  execSync('npm run vite-build', { stdio: 'inherit' });

  // 4. Copy build output to the root directory for direct GitHub Pages serving
  console.log('Copying production build output to the root directory...');
  
  const distIndexHtml = path.join(distPath, 'index.html');
  const distAssetsDir = path.join(distPath, 'assets');

  if (!fs.existsSync(distIndexHtml)) {
    throw new Error('Production build failed: dist/index.html was not generated!');
  }

  // Copy dist/index.html -> ./index.html
  const builtIndexContent = fs.readFileSync(distIndexHtml, 'utf8');
  fs.writeFileSync(indexHtmlPath, builtIndexContent, 'utf8');
  console.log('Replaced root index.html with production-ready compiled index.html');

  // Copy dist/assets/* -> ./assets/*
  if (fs.existsSync(distAssetsDir)) {
    if (!fs.existsSync(rootAssetsPath)) {
      fs.mkdirSync(rootAssetsPath, { recursive: true });
    } else {
      // Clean up previous production assets from rootAssetsPath (skipping hidden items like .aistudio)
      const existingFiles = fs.readdirSync(rootAssetsPath);
      existingFiles.forEach(file => {
        if (!file.startsWith('.')) {
          const filePath = path.join(rootAssetsPath, file);
          if (fs.statSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
            console.log(`Cleaned up old asset: assets/${file}`);
          }
        }
      });
    }
    
    const files = fs.readdirSync(distAssetsDir);
    files.forEach(file => {
      const srcFile = path.join(distAssetsDir, file);
      const destFile = path.join(rootAssetsPath, file);
      fs.copyFileSync(srcFile, destFile);
      console.log(`Copied asset: assets/${file}`);
    });
  }

  console.log('Production build and root file updates completed successfully!');
} catch (error) {
  console.error('Error during build-prod:', error.message);
  process.exit(1);
}
