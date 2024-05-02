import dataSource from '../../connection';
import { User } from './user.entity';

export const userRepository = dataSource.getRepository(User);
