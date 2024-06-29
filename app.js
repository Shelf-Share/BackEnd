require('dotenv').config();
const express = require('express');
const app = express();
const {PORT} = process.env;


app.use(express.json());

const categoryRouter = require('./routes/category.routes');
app.use('/api/v1/category', categoryRouter);

app.listen(PORT, () => console.log('Listening on Port', PORT));