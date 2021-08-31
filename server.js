const express = require('express');
const path = require('path');

const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./dist'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, HOSTNAME, () => {
    // eslint-disable-next-line
  console.log(`Server is running on http://${HOSTNAME}:${PORT}/`);
});
