const path = require('path');
const express = require('express');

const port = process.env.PORT || 9878;
const app = express();

app.use(express.static('./public'));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(port);
console.log('admin dev server is listening on http://localhost:%s', port);
