import { Router } from 'express';
import validLogin from '../middlewares/Validations/validateLogin';
import logInController from '../controllers/Login.controller';
import authenticateLogin from '../middlewares/Auth/authToken';

const router: Router = Router();

router.post('/login', validLogin, logInController);
router.get('/login/validate', authenticateLogin, logInController);

export default router;
