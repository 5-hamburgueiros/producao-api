import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { PedidoLocalizadoException } from '@/domain/exceptions/pedido-localizado.exception';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import {
  IProducaoHistoricoRepository,
  IProducaoRepository,
} from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { IPedidoService } from '@/domain/service/pedido.service';
import { ICreateProducao } from '@/domain/use-cases';
import { environment } from '@/infra/configs/environment';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CreateProducaoUseCase implements ICreateProducao {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(IProducaoHistoricoRepository)
    private readonly producaoHistoricoRepository: IProducaoHistoricoRepository,
    @Inject(IPedidoService)
    private readonly pedidoService: IPedidoService,
  ) {}

  async execute(params: ICreateProducao.Params): Promise<ProducaoEntity> {
    const pedido = await this.pedidoService.get(params.pedido);

    if (!pedido)
      throw new PedidoNaoLocalizadoException('Pedido não encontrado');

    const result = await this.producaoRepository.findByPedido({
      pedido: params.pedido,
    });

    if (result) {
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

    await this.pedidoService.update(params.pedido, data.status);

    return data;
  }
}
