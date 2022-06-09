import { Model, DataTypes } from 'sequelize';
import db from '.';

export default class teams extends Model {
  teamName: string;
}
teams.init({
  teamName: DataTypes.STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'teams',
  timestamps: false,
});
