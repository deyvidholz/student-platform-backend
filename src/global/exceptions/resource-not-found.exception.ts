import { ExceptionConstructorParam } from '../typing';

export class ResourceNotFoundException extends Error {
  public httpCode: number = 404;
  public message: string = 'Resource not found';
  public data?: any;

  constructor(param?: ExceptionConstructorParam) {
    super(param?.message);
    Object.assign(this, param);
  }
}
