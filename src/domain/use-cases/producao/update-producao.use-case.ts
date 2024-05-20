import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { StatusPedido } from '@/domain/enum';

export interface IUpdateProducao {
  execute(params: IUpdateProducao.Params): Promise<IUpdateProducao.Result>;
}

export const IUpdateProducao = Symbol('IUpdateProducao');

export namespace IUpdateProducao {
  export type Params = {
    pedido: string;
    status: StatusPedido;
  };

  export type Result = ProducaoEntity;
}
