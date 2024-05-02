import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import 'reflect-metadata';
import { registerControllers } from '../core/functions/register-controllers';
import corsConfig from './configs/cors.config';
import cookieParser from 'cookie-parser';
import dataSource from './connection';
import { runInit } from '../core/functions/run-init';

dataSource.initialize().then(() => console.log('Database connected'));

const app = express();

// Setting up cors
app.use(cors(corsConfig));

// Setting up global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.CONFIG_REQUEST_LOGS === 'true') {
  app.use(morgan('dev'));
}

// Running init functions
runInit({
  app,
  dataSource,
});

// Setting up public folder
app.use(express.static(path.join(__dirname, '../public')));

// Registering controllers
registerControllers(app);

// Setting up 404 handler
app.use('*', function (req: Request, res: Response) {
  res.status(404).json({ error: true, message: 'Resource not found' });
});

export default app;
