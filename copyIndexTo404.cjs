const fs = require('fs');
const path = require('path');

const distPath = path.resolve('./dist');
const indexHtml = path.join(distPath, 'index.html');
const errorHtml = path.join(distPath, '404.html');

const redirectContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <script type="text/javascript">
    var path = window.location.pathname;
    window.location.replace("/hhRouteErrorReact/index.html#" + path);
  </script>
</head>
<body>
Redirecting...
</body>
</html>
`;

fs.writeFileSync(errorHtml, redirectContent, 'utf-8');
console.log('404.html создан успешно!');
