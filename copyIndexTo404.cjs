const fs = require('fs');
const path = require('path');

const distFolder = path.resolve('./dist');
const indexFile = path.join(distFolder, 'index.html');
const errorFile = path.join(distFolder, '404.html');

fs.copyFile(indexFile, errorFile, (err) => {
  if (err) console.error(err);
  else console.log('404.html успешно создан!');
});
