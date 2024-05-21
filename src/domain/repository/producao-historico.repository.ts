import { ProducaoHistoricoEntity } from '../entities/producao-historico.entity';

export interface IProducaoHistoricoRepository {
  create(
    params: IProducaoHistoricoRepository.Create.Params,
  ): Promise<IProducaoHistoricoRepository.Create.Result>;
}

export const IProducaoHistoricoRepository = Symbol(
  'IProducaoHistoricoRepository',
);

export namespace IProducaoHistoricoRepository {
  export namespace Create {
    export type Params = {
      historico: ProducaoHistoricoEntity;
    };
    export type Result = ProducaoHistoricoEntity;
  }
}
