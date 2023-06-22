import 'express-async-errors';

import express from 'express';

import { shortener, redirection } from './controllers/linksController.js';

// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

//connectDB
import connectDB from './db/connect.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Shortlinker API</h1><a href="/api-docs">Documentation</a>');
});

// routes
app.post('/', shortener);
app.get('/:urlId', redirection);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
