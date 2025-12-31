// fix-api-calls.mjs - ES Module version
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filesToFix = [
  'src/pages/admin/ManageAnnouncements.jsx',
  'src/pages/admin/ManageEvents.jsx',
  'src/pages/admin/ManageBoard.jsx',
  'src/pages/student/Events.jsx',
  'src/pages/student/Updates.jsx',
  'src/pages/student/Board.jsx',
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace /api/endpoint with /endpoint
      content = content.replace(/\/api\/(events|announcements|board)/g, '/$1');
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`❌ File not found: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('\n🎉 All API calls fixed!');
console.log('Restart your development server.');