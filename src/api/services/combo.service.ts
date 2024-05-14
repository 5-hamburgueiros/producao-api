import { IComboService } from '@/domain/service';
import { ComboModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class ComboService implements IComboService {
  constructor(
    @InjectRepository(ComboModelTypeOrm)
    private readonly repository: Repository<ComboModelTypeOrm>,
  ) {}

  async paginate<ComboModelTypeOrm>(
    options: IPaginationOptions,
    query: {
      nome?: string;
      ids?: Array<string>;
    },
  ): Promise<Pagination<ComboModelTypeOrm>> {
    const queryBuilder = this.repository.createQueryBuilder('combo');
    queryBuilder.orderBy('combo.criadoEm', 'DESC');
    if (query.nome) {
      queryBuilder
        .andWhere('combo.nome ilike :nome', {
          nome: `%${query.nome}%`,
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
        .andWhere('combo.id in (:...ids)', {
          ids: buscaIds,
        })
        .getMany();
    }

    queryBuilder.leftJoinAndSelect('combo.itens', 'Combo_Item');

    queryBuilder.leftJoinAndSelect(
      'Combo_Item.ingredientes',
      'Item_Ingrediente',
    );

    return paginate<ComboModelTypeOrm>(queryBuilder as any, options);
  }
}
