import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { PedidoLocalizadoException } from '@/domain/exceptions/pedido-localizado.exception';
import {
  IProducaoHistoricoRepository,
  IProducaoRepository,
} from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { ICreateProducao } from '@/domain/use-cases';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProducaoUseCase implements ICreateProducao {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(IProducaoHistoricoRepository)
    private readonly producaoHistoricoRepository: IProducaoHistoricoRepository,
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

    const producao = new ProducaoEntity({
      id: undefined,
      pedido: params.pedido,
      dataPedido: params.dataPedido,
      status: undefined,
    });

    const data = await this.producaoRepository.create({
      producao,
    });

    const historico = new ProducaoHistoricoEntity({
      id: undefined,
      producao: data.id,
      status: data.status,
    });

    await this.producaoHistoricoRepository.create({
      historico,
    });

    return data;
  }
}
