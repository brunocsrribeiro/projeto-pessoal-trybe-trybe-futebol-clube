import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';

const validToken = async (req: Request, _res: Response, next: NextFunction) => {
  const secretKey: jwt.Secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

  if (req.headers.authorization) { jwt.verify(req.headers.authorization, secretKey); }

  next();
};

export default validToken;
