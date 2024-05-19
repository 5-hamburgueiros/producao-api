import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { IProducaoRepository } from '@/domain/repository';
import { ICreateProducao } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProducaoUseCase implements ICreateProducao {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
  ) {}

  async execute(params: ICreateProducao.Params): Promise<ProducaoEntity> {

    const pedidoModel = new ProducaoEntity({
      id: undefined,
      cliente: params.cliente,
      pedido: params.pedido,
      dataPedido: params.dataPedido,
      status: undefined
    });

    return this.producaoRepository.create({
      pedido: pedidoModel,
    });
  }
}
