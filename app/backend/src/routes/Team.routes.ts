import { Router } from 'express';
import { teamAll, teamId } from '../controllers/Team.controller';

const router: Router = Router();

router
  .get('/teams/:id', teamId)
  .get('/teams', teamAll);

export default router;
