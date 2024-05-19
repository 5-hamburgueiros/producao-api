import { ProducaoEntity } from "../entities/producao.entity";

export interface IProducaoRepository {
    create(params: IProducaoRepository.Create.Params): Promise<IProducaoRepository.Create.Result>;
}

export const IProducaoRepository = Symbol('IProducaoRepository');

export namespace IProducaoRepository {
    export namespace Create {
        export type Params = {
            pedido: ProducaoEntity;
        };
        export type Result = ProducaoEntity;
    }

}
