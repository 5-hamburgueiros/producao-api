import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import { IProducaoRepository } from '@/domain/repository';
import { IFindByPedido } from '@/domain/use-cases/producao/find-by-pedido.use-case';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class FindByPedido implements IFindByPedido {
  constructor(
    @Inject(IProducaoRepository)
    private readonly producaoRepository: IProducaoRepository,
  ) {}
  async execute(params: IFindByPedido.Params): Promise<IFindByPedido.Result> {
    try {
      const result = await this.producaoRepository.findByPedido({
        pedido: params.pedido,
      });
      if (!result)
        throw new PedidoNaoLocalizadoException('Pedido não localizado');
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
