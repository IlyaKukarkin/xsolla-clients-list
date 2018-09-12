let express = require('express');
let path = require('path');
let serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

let port = process.env.PORT || 5000;
app.listen(port);
console.log('server started ' + port);
