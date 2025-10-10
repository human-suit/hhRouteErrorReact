const fs = require('fs');
const path = require('path');

const distPath = path.resolve('./dist');
const indexHtml = path.join(distPath, 'index.html');
const errorHtml = path.join(distPath, '404.html');

try {
  const content = fs.readFileSync(indexHtml, 'utf-8');
  fs.writeFileSync(errorHtml, content, 'utf-8');
  console.log('404.html создан успешно');
} catch (err) {
  console.error('Ошибка при создании 404.html:', err);
}
