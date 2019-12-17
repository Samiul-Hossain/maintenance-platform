const express = require('express');
//const fs = require('fs');

const app = express();

//1-MIDDLEWARES
app.use(express.json());
app.use(express.static(__dirname));

//const overview = fs.readFileSync(`${__dirname}/index.html`);

/* app.get('/', (req, res) => {
  res.status(200).sendFile('index.html', { root: __dirname });
});
 */
//STARTING SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
