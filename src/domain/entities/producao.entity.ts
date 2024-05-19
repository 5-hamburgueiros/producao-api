import { StatusPedido } from '../enum';
import { AbstractEntity } from './abstract.entity';

export class ProducaoEntity extends AbstractEntity {
  public readonly pedido: string;
  public readonly cliente: string;
  public readonly status: StatusPedido;
  public readonly dataPedido: Date;

  constructor(params: ProducaoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.pedido = params.pedido;
    this.cliente = params.cliente;
    this.status = params.status;
    this.dataPedido = params.dataPedido;
  }

  static FromTypeOrmModel(param: ProducaoModel.Params): ProducaoEntity {
    return new ProducaoEntity({
      id: param.id,
      pedido: param.pedido,
      cliente: param.cliente,
      status: param.status,
      dataPedido: param.dataPedido,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace ProducaoModel {
  export type Params = {
    id?: string;
    pedido: string;
    cliente: string;
    status: StatusPedido;
    dataPedido: Date;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
