import { Router } from 'express';
import { finish, matchAll, matchAllSearch, matchCreate } from '../controllers/Match.controller';

const router: Router = Router();

router
  .get('/matches', matchAll)
  .get('/matches', matchAllSearch)
  .post('/matches', matchCreate)
  .patch('/matches/:id/finish', finish);

export default router;
