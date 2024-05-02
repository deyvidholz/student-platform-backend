import { Application } from 'express';
import { DataSource } from 'typeorm';

export type InitFunctionParam = {
  app: Application;
  dataSource: DataSource;
};

export type ExceptionConstructorParam = {
  message?: string;
  httpCode?: number;
  data?: any;
};
