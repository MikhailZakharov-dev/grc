const fs = require('fs');

const parseArgs = (args) => 
  args
    .slice(2)
    .reduce((obj, cur) => {
      // long arg
      if (cur.startsWith('--')) {
        const [flag, value = true] = cur.split('=');
        const name = flag.slice(2);
        obj[name] = value;
      }
      // flags
      else if (cur.startsWith('-')) {
        const flags = cur.slice(1).split('');
        flags.forEach(flag => {
          obj[flag] = true;
        });
      }
      return obj
    }, {});
    
const createDir = (dirPath) => 
  new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

const createFile = (filePath, fileName, content) => 
  new Promise((resolve, reject) => {
    fs.writeFile(`${filePath}/${fileName}`, content, (err) => {
      if (err) reject(err)
      else resolve()
    });
  })

  
module.exports = {
  parseArgs,
  createFile,
  createDir
}