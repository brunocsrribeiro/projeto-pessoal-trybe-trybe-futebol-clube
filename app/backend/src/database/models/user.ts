import { Model, STRING } from 'sequelize';
import db from '.';

export default class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
User.init({
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'user',
  timestamps: false,
});
