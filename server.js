const express = require('express');

const HOSTNAME = '0.0.0.0';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static('./dist'));

app.get('/*', (request, response) => {
    response.sendFile('index.html', { root: __dirname + '/dist' });
});

app.listen(PORT, HOSTNAME, () => {
    // eslint-disable-next-line
  console.log(`Server is running on http://${HOSTNAME}:${PORT}/`);
});
