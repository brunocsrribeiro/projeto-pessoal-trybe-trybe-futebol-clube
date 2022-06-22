import { Router } from 'express';
import LeaderboradController from '../controllers/Leaderboard.controller';

const router: Router = Router();

router
  .get('/leaderboard/home', LeaderboradController);

export default router;
