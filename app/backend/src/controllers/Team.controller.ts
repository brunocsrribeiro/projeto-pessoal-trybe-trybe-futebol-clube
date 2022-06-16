import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { methodTeamsAll, methodTeamId } from '../services/Team.services';

const teamAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await methodTeamsAll();

    return res.status(StatusCodes.OK).json(teams);
  } catch (error) {
    next(error);
  }
};

const teamId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const team = await methodTeamId(Number(id));

    return res.status(StatusCodes.OK).json(team);
  } catch (error) {
    next(error);
  }
};

export { teamAll, teamId };
