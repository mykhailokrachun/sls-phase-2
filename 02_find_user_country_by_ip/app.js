const express = require('express');
const app = express();

app.use(express.json());

const mainController = require('./controllers/main');

app.post('/', mainController);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
