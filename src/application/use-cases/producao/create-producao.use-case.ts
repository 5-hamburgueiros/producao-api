import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { PedidoLocalizadoException } from '@/domain/exceptions/pedido-localizado.exception';
import { IProducaoRepository } from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { ICreateProducao } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProducaoUseCase implements ICreateProducao {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(IProducaoService)
    private readonly producaoService: IProducaoService,
  ) {}

  async execute(params: ICreateProducao.Params): Promise<ProducaoEntity> {
    const result = await this.producaoService.paginate(
      { limit: 1, page: 1 },
      {
        pedido: params.pedido,
      },
    );

    if (result?.meta?.itemCount !== 0) {
      throw new PedidoLocalizadoException('Pedido já cadastrado na produção');
    }

    const pedidoModel = new ProducaoEntity({
      id: undefined,
      pedido: params.pedido,
      dataPedido: params.dataPedido,
      status: undefined,
    });

    return this.producaoRepository.create({
      producao: pedidoModel,
    });
  }
}
