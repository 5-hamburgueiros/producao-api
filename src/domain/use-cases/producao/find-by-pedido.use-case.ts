import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';

export interface IFindByPedido {
  execute(params: IFindByPedido.Params): Promise<IFindByPedido.Result>;
}

export const IFindByPedido = Symbol('IFindByPedido');

export namespace IFindByPedido {
  export type Params = {
    pedido: string;
  };

  export type Result = ProducaoModelTypeOrm;
}
