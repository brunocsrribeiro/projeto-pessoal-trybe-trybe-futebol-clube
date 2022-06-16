import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { methodMatchesAll, methodMatchesSearch } from '../services/Match.services';

const matchAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const matches = await methodMatchesAll();

    return res.status(StatusCodes.OK).json(matches);
  } catch (error) {
    next(error);
  }
};

const matchAllSearch = async (req: Request, res: Response, next: NextFunction) => {
  const { inProgress } = req.query;
  try {
    const search = await methodMatchesSearch(String(inProgress));

    return res.status(StatusCodes.OK).json(search);
  } catch (error) {
    next(error);
  }
};

export { matchAll, matchAllSearch };
