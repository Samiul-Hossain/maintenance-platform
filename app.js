const express = require('express');
//const fs = require('fs');

const app = express();

//1-MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/`));

/* app.get('/', (req, res) => {
  res.status(200).send('/index.html');
}); */

//STARTING SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
