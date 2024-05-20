import { DefaultException } from '@/common/exceptions/default.exception';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { StatusPedido } from '@/domain/enum';
import { PedidoLocalizadoException } from '@/domain/exceptions/pedido-localizado.exception';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import { StatusNaoPermitidoException } from '@/domain/exceptions/status-nao-permitido.exeception';
import { IProducaoRepository } from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { IUpdateProducao } from '@/domain/use-cases';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class UpdateProducaoUseCase implements IUpdateProducao {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
    @Inject(IProducaoService)
    private readonly producaoService: IProducaoService,
  ) {}

  async execute(params: IUpdateProducao.Params): Promise<ProducaoEntity> {
    try {
      const result = await this.producaoService.paginate(
        { limit: 1, page: 1 },
        {
          pedido: params.pedido,
        },
      );

      if (result?.meta?.itemCount === 0) {
        throw new PedidoNaoLocalizadoException('Pedido não localizado.');
      }

      const producao = new ProducaoEntity(result.items[0] as ProducaoEntity);

      this.handleStatus(producao, params.status);

      const data = await this.producaoRepository.create({ producao: producao });

      return data;
    } catch (error) {
      if (error instanceof DefaultException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  private handleStatus(producao: ProducaoEntity, status: StatusPedido): void {
    switch (status) {
      case StatusPedido.EM_PREPARACAO:
        producao.emPreparacao();
        break;
      case StatusPedido.PRONTO:
        producao.pronto();
        break;
      case StatusPedido.FINALIZADO:
        producao.finalizado();
        break;
      default:
        throw new StatusNaoPermitidoException('Status não permitido');
    }
  }
}
