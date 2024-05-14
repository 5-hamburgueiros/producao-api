import { CategoriaItem } from '@/domain/enum';
import { IItemService } from '@/domain/service';
import { ItemModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService implements IItemService {
  constructor(
    @InjectRepository(ItemModelTypeOrm)
    private readonly repository: Repository<ItemModelTypeOrm>,
  ) {}

  async paginate<ItemModelTypeOrm>(
    options: IPaginationOptions,
    query: {
      nome?: string;
      categoria?: CategoriaItem;
      ids?: Array<string>;
    },
  ): Promise<Pagination<ItemModelTypeOrm>> {
    const queryBuilder = this.repository.createQueryBuilder('item');
    queryBuilder.orderBy('item.criadoEm', 'DESC');
    if (query.nome) {
      queryBuilder
        .andWhere('item.nome ilike :nome', {
          nome: `%${query.nome}%`,
        })
        .getMany();
    }
    if (query.categoria) {
      queryBuilder
        .andWhere('item.categoria = :categoria', {
          categoria: query.categoria,
        })
        .getMany();
    }
    if (query.ids) {
      let buscaIds: Array<any>;
      if (Array.isArray(query.ids)) {
        buscaIds = query.ids;
      } else {
        buscaIds = new Array(query.ids);
      }
      queryBuilder
        .andWhere('item.id in (:...ids)', {
          ids: buscaIds,
        })
        .getMany();
    }

    queryBuilder.leftJoinAndSelect('item.ingredientes', 'Item_Ingrediente');

    return paginate<ItemModelTypeOrm>(queryBuilder as any, options);
  }
}
