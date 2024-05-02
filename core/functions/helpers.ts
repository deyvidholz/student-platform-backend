import { FindManyOptions } from 'typeorm';

export const isInDistDirectory = (): boolean => {
  return !!__dirname
    .replace(/(\\|\/)core(\\|\/)functions/, '')
    .match(/(\\|\/)dist$/);
};

export const parseGlob = (paths: string[]): string[] => {
  return paths.map((str) => str.replace(/^dist(\\|\/)/, ''));
};

export const upperCaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const lowerCaseFirst = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const camelCaseToDashCase = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

export const getPaginationObject = (
  options?: GetPaginationObjectParam
): FindManyOptions => {
  if (!options) {
    options = {};
  }

  if (!options.page || Number.isNaN(options.page)) {
    options.page = 1;
  }

  if (!options.itemsPerPage || Number.isNaN(options.itemsPerPage)) {
    options.itemsPerPage = 50;
  }

  return {
    take: options.itemsPerPage,
    skip:
      options.page === 1
        ? 0
        : options.page * options.itemsPerPage - options.itemsPerPage,
  };
};

export type GetPaginationObjectParam = {
  itemsPerPage?: number;
  page?: number;
};
