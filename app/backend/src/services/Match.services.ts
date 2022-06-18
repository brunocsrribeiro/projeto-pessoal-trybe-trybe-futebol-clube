import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import Team from '../database/models/team';

const getAll = async (): Promise<IMatch[]> => {
  const match = await Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return match;
};

const getSearch = async (query: string): Promise<Match[]> => {
  const inProgress = query === 'true';

  const search = await Match.findAll({
    where: {
      inProgress,
    },
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return search;
};

const createMatch = async (matchData: IMatch): Promise<IMatch> => {
  const created = await Match.create(matchData);

  return created;
};

const finishMatch = async (id: number): Promise<void> => {
  await Match.update({ inProgress: 0 }, { where: {
    id,
  } });
};

const matchUpdate = async (
  homeTeamGoals: number,
  awayTeamGoals: number,
  id: number,
): Promise<void> => {
  await Match.update({
    homeTeamGoals,
    awayTeamGoals,
  }, { where: { id } });
};

export {
  getAll,
  getSearch,
  createMatch,
  finishMatch,
  matchUpdate,
};
