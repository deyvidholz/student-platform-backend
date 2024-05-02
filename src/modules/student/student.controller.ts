import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
} from '../../../core/decorators/controller';
import { BaseController } from '../../global/base-controller';
import { StudentService } from './student.service';

@Controller('/student')
export default class StudentController extends BaseController {
  protected service: StudentService = new StudentService();


  @Get('/:id')
  findOne = async (req: Request, res: Response) => {
    super.findOne(req, res);
  };

  @Get('/')
  find = async (req: Request, res: Response) => {
    super.find(req, res);
  };

  @Post('/')
  create = async (req: Request, res: Response) => {
    super.create(req, res);
  };

  @Put('/:id')
  update = async (req: Request, res: Response) => {
    super.update(req, res)
  };

  @Delete('/:id')
  delete = async (req: Request, res: Response) => {
    super.delete(req, res)
  };
}
