const fs = require('fs');
const { promisify } = require('util');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.get('/api/quotes', async (req, res, next) => {
  const quotes = await promisify(fs.readFile)(
    path.join(__dirname, 'files/quotes.json'),
    'utf-8'
  );

  res.status(200).json({
    status: 'success',
    quotes: JSON.parse(quotes),
  });
});

module.exports = app;
