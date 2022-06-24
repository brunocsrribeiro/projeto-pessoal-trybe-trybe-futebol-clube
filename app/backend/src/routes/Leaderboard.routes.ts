import { Router } from 'express';
import { leaderboardHome,
  leaderboardAway, leaderboard } from '../controllers/Leaderboard.controller';

const router: Router = Router();

router
  .get('/leaderboard/home', leaderboardHome)
  .get('/leaderboard/away', leaderboardAway)
  .get('/leaderboard', leaderboard);

export default router;
