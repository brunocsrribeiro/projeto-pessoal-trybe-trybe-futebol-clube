import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const secretKey: jwt.Secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const authenticateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

    return res.status(StatusCodes.OK).json(decoded.userData.role);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default authenticateLogin;
