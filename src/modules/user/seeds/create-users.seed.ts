import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: DataSource): Promise<any> {
    await factory(User)().createMany(3);
  }
}
