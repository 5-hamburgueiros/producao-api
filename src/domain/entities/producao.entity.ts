import { StatusPedido } from '../enum';
import { AbstractEntity } from './abstract.entity';

export class ProducaoEntity extends AbstractEntity {
  public readonly pedido: string;
  public status: StatusPedido;
  public readonly dataPedido: Date;

  constructor(params: ProducaoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.pedido = params.pedido;
    this.status = params.status;
    this.dataPedido = params.dataPedido;
  }

  public emPreparacao(): void {
    if (this.status !== StatusPedido.RECEBIDO) {
      throw new Error('Pedido não foi recebido.');
    }
    this.status = StatusPedido.EM_PREPARACAO;
  }

  public pronto(): void {
    if (this.status !== StatusPedido.EM_PREPARACAO) {
      throw new Error('Pedido não está em preparação');
    }
    this.status = StatusPedido.PRONTO;
  }

  public finalizado(): void {
    if (this.status !== StatusPedido.PRONTO) {
      throw new Error('Pedido não está pronto');
    }
    this.status = StatusPedido.FINALIZADO;
  }

  static FromTypeOrmModel(param: ProducaoModel.Params): ProducaoEntity {
    return new ProducaoEntity({
      id: param.id,
      pedido: param.pedido,
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
    status: StatusPedido;
    dataPedido?: Date;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
