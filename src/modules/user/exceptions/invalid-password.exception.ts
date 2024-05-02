import { ExceptionConstructorParam } from '../../../global/typing';

export class InvalidPasswordException extends Error {
  public httpCode: number = 403;
  public message: string = 'Invalid username or password';
  public data?: any;

  constructor(param?: ExceptionConstructorParam) {
    super(param?.message);
    Object.assign(this, param);
  }
}
