import IMatch from '../interfaces/IMatch';
import Match from '../database/models/match';
import Team from '../database/models/team';

const methodMatchesAll = async (): Promise<IMatch[]> => {
  const match = await Match.findAll({
    include: [
      { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });

  return match;
};

const methodMatchesSearch = async (query: string): Promise<Match[]> => {
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

const methodCreatedMatches = async (matchData: IMatch): Promise<IMatch> => {
  const createMatch = await Match.create(matchData);

  return createMatch;
};

const finishMatch = async (id: number): Promise<void> => {
  await Match.update({ inProgress: 0 }, { where: {
    id,
  } });
};

export {
  methodMatchesAll,
  methodMatchesSearch,
  methodCreatedMatches,
  finishMatch,
};