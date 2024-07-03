import { ICreateProducao } from '@/domain/use-cases';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class StatusPedidoConsumerService {

  constructor(
    @Inject(ICreateProducao)
    private readonly createProducaoUseCase: ICreateProducao
  ) {
  }

  @RabbitSubscribe({ queue: 'pedidos_pagos' })
  public async recebePedidoPago(message: ICreateProducao.Params) {
    console.log(`Received message: ${JSON.stringify(message)}`);
    this.createProducaoUseCase.execute(message)
  }
}