// This file is needed to make TypeORM Seeding work properly
const {
  default: connectionConfig,
} = require('./src/configs/connection.config');

module.exports = { ...connectionConfig };
