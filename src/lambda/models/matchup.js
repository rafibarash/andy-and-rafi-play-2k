const mongoose = require('mongoose');

const TeamStatsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: false,
  },
  fga: {
    type: Number,
    required: false,
  },
  fgm: {
    type: Number,
    required: false,
  },
  threepa: {
    type: Number,
    required: false,
  },
  threepm: {
    type: Number,
    required: false,
  },
  fta: {
    type: Number,
    required: false,
  },
  ftm: {
    type: Number,
    required: false,
  },
  fastBreakPoints: {
    type: Number,
    required: false,
  },
  pointsInPaint: {
    type: Number,
    required: false,
  },
  secondChancePoints: {
    type: Number,
    required: false,
  },
  benchPoints: {
    type: Number,
    required: false,
  },
  assists: {
    type: Number,
    required: false,
  },
  offensiveRebounds: {
    type: Number,
    required: false,
  },
  defensiveRebounds: {
    type: Number,
    required: false,
  },
  steals: {
    type: Number,
    required: false,
  },
  blocks: {
    type: Number,
    required: false,
  },
  turnovers: {
    type: Number,
    required: false,
  },
  fouls: {
    type: Number,
    required: false,
  },
  dunks: {
    type: Number,
    required: false,
  },
});

const MatchupSchema = mongoose.Schema({
  teamOneStats: {
    type: TeamStatsSchema,
    required: true,
  },
  teamTwoStats: {
    type: TeamStatsSchema,
    required: true,
  },
  matchupID: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Matchup = mongoose.model('matchup', MatchupSchema);

module.exports = Matchup;
