let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));
let port = process.env.PORT || 5000;
app.use(serveStatic(path.join(__dirname, 'static')));
app.listen(port);
console.log('server started ' + port);
