import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import methodLeaderboard from '../services/LeaderBoard.services';

const leaderboardHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderHome = await methodLeaderboard();

    return res.status(StatusCodes.OK).json(leaderHome);
  } catch (error) {
    next(error);
  }
};

export default leaderboardHome;
