import express from 'express';

// Routes
import TeamsRouter from './routes/api/teams';
import MatchupRouter from './routes/api/matchup';

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
// connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/teams', TeamsRouter);
app.use('/api/matchup', MatchupRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/reviews', reviewsRouter);
// app.use('/api/profile', profileRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}...`)
);
