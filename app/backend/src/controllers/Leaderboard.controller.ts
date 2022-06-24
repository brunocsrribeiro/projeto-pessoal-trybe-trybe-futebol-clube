import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import methodLeaderboardAway from '../services/LeaderBoardAway.services';
import methodLeaderboardHome from '../services/LeaderBoardHome.services';
import methodLeaderboard from '../services/LeaderBoard.services';

const leaderboardHome = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderHome = await methodLeaderboardHome();

    return res.status(StatusCodes.OK).json(leaderHome);
  } catch (error) {
    next(error);
  }
};

const leaderboardAway = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderAway = await methodLeaderboardAway();

    return res.status(StatusCodes.OK).json(leaderAway);
  } catch (error) {
    next(error);
  }
};

const leaderboard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderAway = await methodLeaderboard();

    return res.status(StatusCodes.OK).json(leaderAway);
  } catch (error) {
    next(error);
  }
};

export {
  leaderboardHome,
  leaderboardAway,
  leaderboard,
};
