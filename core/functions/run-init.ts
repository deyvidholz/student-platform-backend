import glob from 'glob';
import { InitFunctionParam } from 'src/global/typing';
import { isInDistDirectory, parseGlob } from './helpers';

const getInitPaths = () => {
  const joinDir = isInDistDirectory() ? 'dist/' : '';
  const dir = `${joinDir}src/**/*.init.{ts,js}`;
  return parseGlob(glob.sync(dir));
};

export const runInit = async (params: InitFunctionParam) => {
  const initPaths = getInitPaths();

  for (const dir of initPaths) {
    const { default: initFunction } = require(`../../${dir}`);
    await initFunction(params);
  }
};
