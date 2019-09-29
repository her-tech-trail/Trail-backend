import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';

config();

// global app object
const app = express();

// allow cross-origin resource sharing
app.use(cors());

// Express config default for json-body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Base Route Response
app.get('/api', (req, res) => res.json({ status: 200, message: 'Hey! this is her-tech-trail' }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 5000;

// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server currently running on port ${PORT}`));

export default app;
