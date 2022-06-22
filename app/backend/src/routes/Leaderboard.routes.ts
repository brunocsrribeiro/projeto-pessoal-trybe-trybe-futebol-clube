import { Router } from 'express';
import { leaderboardHome, leaderboardAway } from '../controllers/Leaderboard.controller';

const router: Router = Router();

router
  .get('/leaderboard/home', leaderboardHome)
  .get('/leaderboard/away', leaderboardAway);

export default router;
