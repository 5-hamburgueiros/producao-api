import { StatusPedido } from '../enum';

export interface IPedidoService {
  get(pedidoId: string): Promise<any>;
  update(pedidoId: string, status: StatusPedido): Promise<any>;
}

export const IPedidoService = Symbol('IPedidoService');
