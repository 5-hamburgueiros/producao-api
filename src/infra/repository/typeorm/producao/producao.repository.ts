import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { IProducaoRepository } from '@/domain/repository';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProducaoRepositoryTypeOrm implements IProducaoRepository {
  constructor(
    @InjectRepository(ProducaoModelTypeOrm)
    private readonly producaoRepository: Repository<ProducaoModelTypeOrm>,
  ) {}

  create(params: IProducaoRepository.Create.Params): Promise<ProducaoEntity> {
    return this.producaoRepository.save(params.pedido);
  }
}
