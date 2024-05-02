import { Repository } from 'typeorm';
import { BaseService } from '../../global/base-service';
import { User } from './user.entity';
import { userRepository } from './user.repository';
import * as jwt from 'jsonwebtoken';
import { CreateUserDTO, JWTPayload } from './user.typing';
import { encryptPassword, isValidPassword } from './user.helpers';
import { ResourceNotFoundException } from '../../global/exceptions/resource-not-found.exception';
import { InvalidPasswordException } from './exceptions/invalid-password.exception';

type AuthParam = {
  username: string;
  password: string;
};

type AuthReturn = {
  accessToken: string;
  expiration: number;
};

export class UserService extends BaseService {
  protected repository: Repository<User> = userRepository;

  async create(payload: CreateUserDTO): Promise<User | null> {
    const user = await this.repository.save({
      username: payload.username,
      password: encryptPassword(payload.password),
    });

    // @ts-expect-error
    delete user.password;
    return user;
  }

  async auth(payload: AuthParam): Promise<AuthReturn> {
    const { password, username } = payload;

    let user = await userRepository.findOne({
      select: ['id', 'username', 'password'],
      where: { username },
    });

    if (!user) {
      throw new ResourceNotFoundException();
    }

    const isPasswordInvalid: boolean = !isValidPassword(
      password,
      user.password
    );

    if (isPasswordInvalid) {
      throw new InvalidPasswordException();
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
    };

    const token = jwt.sign(jwtPayload, String(process.env.JWT_SECRET_KEY), {
      expiresIn: +String(process.env.JWT_EXPIRATION),
    });

    const decodedToken = jwt.decode(token) as jwt.JwtPayload;
    return { accessToken: token, expiration: Number(decodedToken.exp) };
  }
}
