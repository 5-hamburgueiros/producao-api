import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { IProducaoHistoricoRepository } from '@/domain/repository';
import {
  ProducaoHistoricoModelTypeOrm,
  ProducaoModelTypeOrm,
} from '@/infra/database/typerom/model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProducaoHistoricoRepositoryTypeOrm
  implements IProducaoHistoricoRepository
{
  constructor(
    @InjectRepository(ProducaoHistoricoModelTypeOrm)
    private readonly producaoHistoricoRepository: Repository<ProducaoHistoricoModelTypeOrm>,
  ) {}

  create(
    params: IProducaoHistoricoRepository.Create.Params,
  ): Promise<ProducaoHistoricoEntity> {
    return this.producaoHistoricoRepository.save(params.historico);
  }
}
