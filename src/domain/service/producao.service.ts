import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

export interface IProducaoService {
  paginate<T>(options: IPaginationOptions, query: any): Promise<Pagination<T>>;
}

export const IProducaoService = Symbol('IProducaoService');
