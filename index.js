const express = require('express');

const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
    res.end('Hello World!');
  });

app.listen(port, () => {
    console.log(`Server is running at: ${port}`);
})