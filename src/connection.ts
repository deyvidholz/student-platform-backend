import { DataSource } from 'typeorm';
import connectionConfig from './configs/connection.config';

const dataSource = new DataSource(connectionConfig);

export default dataSource;
