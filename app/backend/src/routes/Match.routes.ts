import { Router } from 'express';
import { matchAll, matchAllSearch } from '../controllers/Match.controller';

const router: Router = Router();

router
  .get('/matches', matchAll)
  .get('/matches', matchAllSearch);

export default router;
