import glob from 'glob';
import 'reflect-metadata';
import { Application } from 'express';
import { ControllerOptions, RouteDefinition } from '../decorators/controller';
import { isInDistDirectory, parseGlob } from './helpers';
import { validate } from '../middlewares/validator';

const getControllerPaths = () => {
  const joinDir = isInDistDirectory() ? 'dist/' : '';
  const dir = `${joinDir}src/**/*.controller.{ts,js}`;
  return parseGlob(glob.sync(dir));
};

export const registerControllers = (app: Application) => {
  const controllerPaths = getControllerPaths();

  for (const dir of controllerPaths) {
    const { default: Controller } = require(`../../${dir}`);
    try {
      const instance = new Controller();
      const prefix = Reflect.getMetadata('prefix', instance);
      const options: ControllerOptions = Reflect.getMetadata(
        'options',
        instance
      );
      const routes: RouteDefinition[] =
        Reflect.getMetadata('routes', instance) || [];

      routes.forEach((route: RouteDefinition) => {
        const middlewares = [
          ...((options.middlewares as any) || []),
          ...(route.middlewares as any),
        ];

        if (route.validator) {
          middlewares.push(validate(route.validator));
        }

        app[route.method](
          `${prefix}${route.path}`,
          ...middlewares,
          instance[route.methodName]
        );
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  }
};
