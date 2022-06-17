import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'fs';
import * as jwt from 'jsonwebtoken';
import {
  methodMatchesAll,
  methodMatchesSearch,
  methodCreatedMatches,
  finishMatch } from '../services/Match.services';

const secretKey: jwt.Secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

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

const matchCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token' });
  }

  try {
    jwt.verify(token, secretKey) as jwt.JwtPayload;

    const createMatch = await methodCreatedMatches({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    if (createMatch.homeTeam === createMatch.awayTeam) {
      res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    return res.status(StatusCodes.CREATED).json(createMatch);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

const finish = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    await finishMatch(Number(id));

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  } catch (error) {
    next(error);
  }
};

export { matchAll, matchAllSearch, matchCreate, finish };
