import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import teams from './team';

export default class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Match.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'match',
  timestamps: false,
});

teams.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
teams.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

Match.belongsTo(teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(teams, { foreignKey: 'awayTeam', as: 'teamAway' });
