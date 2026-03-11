const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/dark:bg-slate-900/g, 'dark:bg-[rgb(30,41,59)]') // we replace with custom arbitrary to make sure we hit what we need, wait Tailwind has bg-slate-800 perfectly.
      .replace(/dark:border-slate-800/g, 'dark:border-slate-700');
    
    // Wait, let's just use Tailwind standard classes.
    newContent = newContent.replace(/dark:bg-\[rgb\(30,41,59\)\]/g, 'dark:bg-slate-800');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
