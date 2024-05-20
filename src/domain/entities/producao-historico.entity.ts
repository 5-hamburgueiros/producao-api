import { StatusPedido } from '../enum';
import { AbstractEntity } from './abstract.entity';

export class ProducaoHistoricoEntity extends AbstractEntity {
  producao: string;
  status: StatusPedido;

  constructor(params: ProducaoHistoricoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.producao = params.producao;
    this.status = params.status;
  }

  static FromTypeOrmModel(
    param: ProducaoHistoricoModel.Params,
  ): ProducaoHistoricoEntity {
    return new ProducaoHistoricoEntity({
      id: param.id,
      producao: param.producao,
      status: param.status,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace ProducaoHistoricoModel {
  export type Params = {
    id: string;
    producao: string;
    status: StatusPedido;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
