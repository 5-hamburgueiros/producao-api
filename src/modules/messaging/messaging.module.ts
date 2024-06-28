import { StatusPedidoConsumerService } from '@/api/services/messaging/status-pedido-consumer.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProducaoModule } from '../producao/producao.module';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('RMQ_HOST');
        const user = configService.get('RMQ_USER');
        const password = configService.get('RMQ_PASSWORD');
        return {
          uri: [`amqp://${user}:${password}@${host}`],
        };
      },
      inject: [ConfigService],
    }),
    ProducaoModule,
  ],
  providers: [
    StatusPedidoConsumerService,
  ]
})
export class MessagingModule { }


{

}