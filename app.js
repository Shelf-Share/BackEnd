require('dotenv').config();
const express = require('express');
const app = express();
const {PORT} = process.env;


app.use(express.json());

const agencyRouter = require('./routes/agency.routes');
app.use('/api/v1/agency', agencyRouter);

const authRouter = require('./routes/auth.routes');
app.use('/api/v1/auth', authRouter);

const categoryRouter = require('./routes/category.routes');
app.use('/api/v1/category', categoryRouter);

const communityRouter = require('./routes/community.routes');
app.use('/api/v1/community', communityRouter);

const newsRouter = require('./routes/news.routes');
app.use('/api/v1/news', newsRouter);

app.listen(PORT, () => console.log('Listening on Port', PORT));