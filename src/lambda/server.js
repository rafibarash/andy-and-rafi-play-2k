const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const connectDB = require('./utils/db');
const MatchupRouter = require('./routes/matchup');

// Init App
const app = express();
const basePath = '/.netlify/functions/server';

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get(basePath, (req, res) => res.send('API running'));
app.use(`${basePath}/matchup`, MatchupRouter);
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
