import { CategoriaItem } from '../enum';
import { AbstractEntity } from './abstract.entity';
import { IngredienteEntity } from './ingrediente.entity';

export class ProducaoEntity extends AbstractEntity {
  public readonly pedido: string;
  public readonly valor: number;
  public readonly categoria: CategoriaItem;
  public readonly ingredientes: Array<IngredienteEntity> = [];

  constructor(params: ProducaoModel.Params) {
    super(params.id, params.criadoEm, params.atualizadoEm);
    this.pedido = params.pedido;
  }

  static FromTypeOrmModel(param: ProducaoModel.Params): ProducaoEntity {
    return new ProducaoEntity({
      id: param.id,
      pedido: param.pedido,
      criadoEm: param.criadoEm,
      atualizadoEm: param.atualizadoEm,
    });
  }
}

export namespace ProducaoModel {
  export type Params = {
    id?: string;
    pedido: string;
    status: string;
    criadoEm?: string;
    atualizadoEm?: string;
  };
}
