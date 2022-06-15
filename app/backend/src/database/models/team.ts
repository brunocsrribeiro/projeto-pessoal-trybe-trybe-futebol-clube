import { Model, STRING } from 'sequelize';
import db from '.';

export default class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  teamName: STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'team',
  timestamps: false,
});
