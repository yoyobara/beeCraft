/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import cors from "cors";

const app = express();
const PORT = 3333

app.use(cors({
  origin: 'http://localhost:4200', // The frontend URL
  methods: 'GET',
}));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to the BeeCraft API!' });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}/api`);
});
