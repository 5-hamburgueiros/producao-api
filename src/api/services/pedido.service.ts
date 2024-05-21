import { DefaultException } from '@/common/exceptions/default.exception';
import { StatusPedido } from '@/domain/enum';
import { IPedidoService } from '@/domain/service/pedido.service';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PedidoService implements IPedidoService {
  private readonly PEDIDO_API_URL = process.env.PEDIDO_API_URL;

  async get(pedidoId: string): Promise<any> {
    try {
      const url = `${this.PEDIDO_API_URL}/pedidos/${pedidoId}`;
      return await axios.get(url);
    } catch (error) {
      if (error instanceof DefaultException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(pedidoId: string, status: StatusPedido): Promise<any> {
    try {
      const url = `${this.PEDIDO_API_URL}/pedidos/${pedidoId}/status`;
      return await axios.patch(url, {
        status,
      });
    } catch (error) {
      if (error instanceof DefaultException) throw error;
      throw new InternalServerErrorException(error.message);
    }
  }
}
