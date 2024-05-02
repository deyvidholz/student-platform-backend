import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default {
  type: process.env.DB_TYPE,
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  entities: [process.env.TYPEORM_DIR_ENTITIES || 'src/**/*.entity.{js,ts}'],
  migrations: [
    process.env.TYPEORM_DIR_MIGRATIONS || 'src/**/*.migration.{js,ts}',
  ],
  subscribers: [
    process.env.TYPEORM_DIR_SUBSCRIBERS || 'src/**/*.subscriber.{js,ts}',
  ],
  seeds: [process.env.TYPEORM_DIR_SEEDS || 'src/**/*.seed.{js,ts}'],
  factories: [process.env.TYPEORM_DIR_FACTORIES || 'src/**/*.factory.{js,ts}'],
} as PostgresConnectionOptions;
