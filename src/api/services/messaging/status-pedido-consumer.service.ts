import { ICreateProducao } from '@/domain/use-cases';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class StatusPedidoConsumerService {
  constructor(
    @Inject(ICreateProducao)
    private readonly createProducaoUseCase: ICreateProducao,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({ queue: 'pedidos_pagos' })
  public async recebePedidoPago(message: ICreateProducao.Params) {
    try {
      // throw new Error('ERROR')
      console.log(`Received message: ${JSON.stringify(message)}`);
      this.createProducaoUseCase.execute(message);
    } catch (error) {
      await this.amqpConnection.managedChannel.sendToQueue('pedido_compensatorio_pagamento', JSON.stringify(message))
    }
  }
}
