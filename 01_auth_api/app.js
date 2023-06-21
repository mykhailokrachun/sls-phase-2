import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
//routers
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
//middleware
import authenticateUser from './middleware/authentication.js';
//error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Auth API</h1>');
});

// routes
app.use('/auth', authRouter);
app.use('/me', authenticateUser, userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
