import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoEntity } from '../entities/producao.entity';

export interface IProducaoRepository {
  create(
    params: IProducaoRepository.Create.Params,
  ): Promise<IProducaoRepository.Create.Result>;

  findByPedido(
    params: IProducaoRepository.FindByPedido.Params,
  ): Promise<IProducaoRepository.FindByPedido.Result>;
}

export const IProducaoRepository = Symbol('IProducaoRepository');

export namespace IProducaoRepository {
  export namespace Create {
    export type Params = {
      producao: ProducaoEntity;
    };
    export type Result = ProducaoEntity;
  }

  export namespace FindByPedido {
    export type Params = {
      pedido: string;
    };
    export type Result = ProducaoModelTypeOrm;
  }
}
