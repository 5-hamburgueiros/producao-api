import { ProducaoEntity } from '@/domain/entities/producao.entity';

export interface ICreateProducao {
  execute(params: ICreateProducao.Params): Promise<ICreateProducao.Result>;
}

export const ICreateProducao = Symbol('ICreateProducao');

export namespace ICreateProducao {
  export type Params = {
    pedido?: string;
    dataPedido?: Date;
  };

  export type Result = ProducaoEntity;
}
