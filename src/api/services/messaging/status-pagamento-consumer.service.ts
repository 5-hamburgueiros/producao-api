import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class StatusPagamentoConsumerService {

  constructor(
  ) { }

  // @RabbitSubscribe({ queue: 'pagamentos_confirmados' })
  // public async recebePagamentosConfirmados(msg: any) {
  //   console.log(`Received message: ${JSON.stringify(msg)}`);
    
  // }

  // @RabbitSubscribe({ queue: 'pagamentos_cancelados' })
  // public async recebePagamentosCancelados(msg: any) {
  //   console.log(`Received message: ${JSON.stringify(msg)}`);
    
  // }
}