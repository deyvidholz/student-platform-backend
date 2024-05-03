import {
  getPaginationObject,
  GetPaginationObjectParam,
} from '../../core/functions/helpers';
import { ILike, Repository } from 'typeorm';
import { ResourceNotFoundException } from './exceptions/resource-not-found.exception';

export class BaseService {
  protected repository: Repository<any>;

  async findOne(id: string) {
    const response = await this.repository.findOne({ where: { id } });

    if (!response) {
      throw new ResourceNotFoundException();
    }

    return response;
  }

  async find(options?: FindParam) {
    const paginateOptions = getPaginationObject(options);

    const [items, totalItems] = await this.repository.findAndCount({
      ...paginateOptions,
      where: options?.search?.length ? { name: ILike(`%${options.search}%`) } : undefined
    });

    const totalPages = Math.ceil(totalItems / (options?.itemsPerPage || 25));

    return {
      totalItems,
      totalPages,
      page: options?.page || 1,
      itemsPerPage: options?.itemsPerPage || 25,
      items,
    }
  }

  async create(payload: CreateParam) {
    return this.repository.save(payload);
  }

  async update(id: string, payload: UpdateParam) {
    return this.repository.update(id, payload);
  }

  async delete(id: string) {
    this.repository.delete(id);
    return;
  }
}

type FindParam = Partial<GetPaginationObjectParam>;

type CreateParam = any;

type UpdateParam = any;
