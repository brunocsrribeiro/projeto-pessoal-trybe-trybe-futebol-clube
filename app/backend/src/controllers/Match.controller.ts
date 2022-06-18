import { NextFunction, Request, Response } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { methodTeamId } from '../services/Team.services';
import { getAll, getSearch, createMatch,
  finishMatch, matchUpdate } from '../services/Match.services';

const matchAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.query;

    if (inProgress) {
      const search = await getSearch(String(inProgress));

      return res.status(StatusCodes.OK).json(search);
    }

    const matches = await getAll();

    return res.status(StatusCodes.OK).json(matches);
  } catch (error) {
    next(error);
  }
};

const matchCreate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.homeTeam === req.body.awayTeam) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: 'It is not possible to create a match with two equal teams' });
    }

    const team1 = await methodTeamId(req.body.homeTeam);
    const team2 = await methodTeamId(req.body.awayTeam);

    if (!team1 || !team2) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'There is no team with such id!' });
    }

    const match = await createMatch(req.body);

    return res.status(StatusCodes.CREATED).json(match);
  } catch (error) {
    next(error);
  }
};

const finish = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await finishMatch(Number(id));

    return res.status(StatusCodes.OK).json({ message: 'Finished' });
  } catch (error) {
    next(error);
  }
};

const updateMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    await matchUpdate(
      Number(homeTeamGoals),
      Number(awayTeamGoals),
      Number(id),
    );

    return res.status(StatusCodes.OK)
      .json(getReasonPhrase(StatusCodes.OK));
  } catch (error) {
    next(error);
  }
};

export { matchAll, matchCreate, finish, updateMatch };
