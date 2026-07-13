import fs from 'fs';
import path from 'path';

const indexHtmlPath = path.resolve('index.html');
const indexHtmlDevPath = path.resolve('index.html.dev');

try {
  if (fs.existsSync(indexHtmlDevPath)) {
    console.log('Restoring development index.html template from backup...');
    const devContent = fs.readFileSync(indexHtmlDevPath, 'utf8');
    fs.writeFileSync(indexHtmlPath, devContent, 'utf8');
    console.log('Successfully restored development index.html!');
  } else {
    console.log('index.html.dev backup does not exist yet. No action needed.');
  }
} catch (error) {
  console.error('Error during restore-dev:', error.message);
}
