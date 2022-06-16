import ITeam from '../interfaces/ITeam';
import Team from '../database/models/team';

const methodTeamsAll = async (): Promise<ITeam[]> => {
  const team = await Team.findAll();

  return team;
};

const methodTeamId = async (id: number): Promise<Team | null> => {
  const team = await Team.findByPk(id);

  return team;
};

export { methodTeamsAll, methodTeamId };
