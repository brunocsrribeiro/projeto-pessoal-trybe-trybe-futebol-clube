import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as Bcrypt from 'bcryptjs';
import User from '../database/models/user';
import ILogin from '../interfaces/ILogin';

const jwtConfig: jwt.SignOptions = { expiresIn: '30d', algorithm: 'HS256' };
const secretKey: jwt.Secret = fs.readFileSync('jwt.evaluation.key', 'utf-8');

const methodLogInService = async (userData: ILogin) => {
  const user = await User.findOne({ where: { email: userData.email } });

  if (!user) throw new Error('User not exist');

  const verifyPassword = Bcrypt.compareSync(userData.password, user.password);

  if (verifyPassword) {
    const token: string = jwt.sign({ userData: user }, secretKey, jwtConfig);

    return { user: { id: user?.id,
      username: user?.username,
      role: user?.role,
      email: user?.email },
    token };
  }
};

export default methodLogInService;
