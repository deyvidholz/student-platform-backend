import 'reflect-metadata';
import Joi from 'joi';

export type ControllerOptions = {
  middlewares?: Function[];
};

export const Controller =
  (prefix: string, options?: ControllerOptions): ClassDecorator =>
  (target: any): void => {
    Reflect.defineMetadata('prefix', prefix, target.prototype);

    const controllerOptions: ControllerOptions = {
      middlewares: [],
      ...(options || {}),
    };

    if (!Reflect.hasMetadata('options', target.prototype)) {
      Reflect.defineMetadata('options', controllerOptions, target.prototype);
    }
  };

export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  OPTIONS = 'options',
}

export type RouteOptions = {
  middlewares?: Function[];
  validator?: () => Joi.ObjectSchema;
};

export type RouteDefinition = {
  path: string;
  method: HttpMethods;
  methodName: string;
  middlewares: Function[];
  validator?: () => Joi.ObjectSchema;
};

export const Route =
  (path: string, method: HttpMethods, options?: RouteOptions) =>
  (target: any, propertyKey: string): void => {
    if (!Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }

    const routes: RouteDefinition[] = Reflect.getMetadata('routes', target);
    const route: RouteDefinition = {
      method,
      methodName: propertyKey,
      path,
      middlewares: options?.middlewares ?? [],
      validator: options?.validator,
    };

    routes.push(route);
    Reflect.defineMetadata('routes', routes, target);
  };

export const Get = (path: string, options?: RouteOptions) =>
  Route(path, HttpMethods.GET, options);

export const Post = (path: string, options?: RouteOptions) =>
  Route(path, HttpMethods.POST, options);

export const Put = (path: string, options?: RouteOptions) =>
  Route(path, HttpMethods.PUT, options);

export const Patch = (path: string, options?: RouteOptions) =>
  Route(path, HttpMethods.PATCH, options);

export const Delete = (path: string, options?: RouteOptions) =>
  Route(path, HttpMethods.DELETE, options);
