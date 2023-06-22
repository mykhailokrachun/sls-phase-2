require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const Data = require('./models/data');

app.use(express.json());

app.put('/:bucket_name/:name', async (req, res) => {
  const jsonPath = req.params.bucket_name + req.params.name;
  await Data.create({ jsonPath, data: { ...req.body } });

  res.json({ ...req.body });
});

app.get('/:bucket_name/:name', async (req, res) => {
  try {
    const jsonPath = req.params.bucket_name + req.params.name;
    const data = await Data.findOne({ jsonPath });

    res.json(data.data);
  } catch (error) {
    res.status(404).json({ success: false, error: 'Data not found' });
  }
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
