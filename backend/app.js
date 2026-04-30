const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const sceneRouter = require('./routes/sceneRoutes');
const assetRouter = require('./routes/assetRoutes');
const userRouter = require('./routes/userRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/v1/scenes', sceneRouter);
app.use('/api/v1/assets', assetRouter);
app.use('/api/v1/users', userRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', app: 'RenderFlow API' });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` API running on port ${PORT}`);
});

module.exports = app;