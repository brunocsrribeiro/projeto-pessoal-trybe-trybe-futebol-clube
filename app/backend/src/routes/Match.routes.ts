import { Router } from 'express';
import validToken from '../middlewares/Validations/ValidToken';
import { finish, matchAll, matchCreate, updateMatch } from '../controllers/Match.controller';

const router: Router = Router();

router
  .get('/matches', matchAll)
  .post('/matches', validToken, matchCreate)
  .patch('/matches/:id/finish', finish)
  .patch('/matches/:id', updateMatch);

export default router;
