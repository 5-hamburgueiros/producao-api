import { StatusPedido } from '@/domain/enum';
import { IProducaoService } from '@/domain/service/producao.service';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationMeta,
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class ProducaoService implements IProducaoService {
  constructor(
    @InjectRepository(ProducaoModelTypeOrm)
    private readonly repository: Repository<ProducaoModelTypeOrm>,
  ) {}

  paginate<ProducaoModelTypeOrm>(
    options: IPaginationOptions<IPaginationMeta>,
    query: {
      pedido?: string;
      status?: StatusPedido;
    },
  ): Promise<Pagination<ProducaoModelTypeOrm>> {
    const queryBuilder = this.repository.createQueryBuilder('producao');

    queryBuilder.select(['producao']);

    queryBuilder.orderBy('producao.dataPedido', 'ASC');

    if (query.pedido) {
      queryBuilder
        .andWhere('producao.pedido = :pedido', {
          pedido: query.pedido,
        })
        .getMany();
    }

    if (query.status) {
      queryBuilder
        .andWhere('producao.status IN (:...status)', {
          status: query.status,
        })
        .getMany();
    }

    return paginate<ProducaoModelTypeOrm>(queryBuilder as any, options);
  }
}
