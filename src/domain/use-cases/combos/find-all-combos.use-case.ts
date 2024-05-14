import { ComboEntity } from '@/domain/entities';

export interface IFindAllCombos {
  execute(params: IFindAllCombos.Params): Promise<IFindAllCombos.Result>;
}

export const IFindAllCombos = Symbol('IFindAllCombos');

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IFindAllCombos {
  export type Params = {
    nome?: string;
    ids?: Array<string>;
  };

  export type Result = Array<ComboEntity>;
}
