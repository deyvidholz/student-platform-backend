import Faker, { faker } from '@faker-js/faker';
import { define } from 'typeorm-seeding';
import { User } from '../user.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = user.username;

  return user;
});
