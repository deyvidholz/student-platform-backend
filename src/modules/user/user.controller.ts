import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '../../../core/decorators/controller';
import { BaseController } from '../../global/base-controller';
import { isAuthenticated } from './user.middlewares';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.typing';
import createUserValidator from './validators/create-user.validator';

@Controller('/users')
export default class UserController extends BaseController {
  protected service: UserService = new UserService();

  @Post('/auth')
  auth = async (req: Request, res: Response) => {
    return this.handle({
      method: () =>
        this.service.auth({
          username: req.body.username,
          password: req.body.password,
        }),
      res,
    });
  };

  @Get('/', { middlewares: [isAuthenticated] })
  find = async (req: Request, res: Response) => {
    return this.handle({
      method: () => this.service.findOne(req.user?.id),
      res,
    });
  };

  @Post('/', {
    validator: createUserValidator,
  })
  create = async (req: Request, res: Response) => {
    const payload: CreateUserDTO = {
      username: req.body.username,
      password: req.body.password,
    };

    req.body = payload;

    return super.create(req, res);
  };

  @Put('/', { middlewares: [isAuthenticated] })
  update = async (req: Request, res: Response) => {
    const payload: UpdateUserDTO = {
      username: req.body.username,
      password: req.body.password,
    };

    req.body = payload;

    return this.handle({
      method: () => this.service.update(req.user?.id, req.body),
      res,
    });
  };

  @Delete('/', { middlewares: [isAuthenticated] })
  delete = async (req: Request, res: Response) => {
    return this.handle({
      method: () => this.service.delete(req.user?.id),
      res,
    });
  };
}
