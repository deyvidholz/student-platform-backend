import { Request, Response } from 'express';
import { BaseService } from './base-service';
import exceptionHandlersConfig from '../configs/exception-handlers.config';

export abstract class BaseController {
  protected service: BaseService;

  async handle(param: HandleParam): Promise<any> {
    try {
      const response = await param.method();
      return param.res.status(param.successStatus || 200).json(response);
    } catch (error: any) {
      const errorClassName = error?.constructor?.name;

      if (errorClassName && exceptionHandlersConfig.parser[errorClassName]) {
        exceptionHandlersConfig.parser[errorClassName](error);
      }

      const errorResponseData: { [key: string]: any } = {
        error: true,
        message: error?.message || error?.stack,
      };

      if (error?.data) {
        errorResponseData.data = error.data;
      }

      return param.res.status(error?.httpCode || 500).json(errorResponseData);
    }
  }

  async findOne(req: Request, res: Response): Promise<any> {
    return this.handle({
      method: () => this.service.findOne(req.params.id),
      res,
    });
  }

  async find(req: Request, res: Response): Promise<any> {
    return this.handle({
      method: () =>
        this.service.find({
          itemsPerPage: Number(req.query['itemsPerPage']),
          page: Number(req.query['page']),
          search: req.query['search'] as string,
        }),
      res,
    });
  }

  async create(req: Request, res: Response): Promise<any> {
    return this.handle({
      method: () => this.service.create(req.body),
      successStatus: 201,
      res,
    });
  }

  async update(req: Request, res: Response): Promise<any> {
    return this.handle({
      method: () => this.service.update(req.params.id, req.body),
      res,
    });
  }

  async delete(req: Request, res: Response): Promise<any> {
    return this.handle({
      method: () => this.service.delete(req.params.id),
      res,
    });
  }
}

export type HandleParam = {
  method: Function;
  res: Response;
  successStatus?: number;
};
