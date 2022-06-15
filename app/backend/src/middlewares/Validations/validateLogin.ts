import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import loginSchema from '../Schemas/loginSchema';

const validLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = loginSchema.validate({ email, password });

  if (error) {
    const typeError = error.message.includes('required');
    const typeEmpty = error.message.includes('empty');

    if (typeError || typeEmpty) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields must be filled' });
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Incorrect email or password' });
  }

  next();
};

export default validLogin;
