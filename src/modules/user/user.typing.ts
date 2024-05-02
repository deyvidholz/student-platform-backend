import { User } from './user.entity';

export type JWTPayload = { id: string };

export type CreateUserDTO = Pick<User, 'username' | 'password'>;

export type UpdateUserDTO = Pick<User, 'username' | 'password'>;
