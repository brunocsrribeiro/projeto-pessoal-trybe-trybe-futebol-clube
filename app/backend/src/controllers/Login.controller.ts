import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import methodLogInService from '../services/Login.services';

const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const loginCreate = await methodLogInService({ email, password });

    if (!loginCreate) {
      return res.status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Incorrect email or password' });
    }

    return res.status(StatusCodes.OK).json(loginCreate);
  } catch (error) {
    next(error);
  }
};

export default logIn;
