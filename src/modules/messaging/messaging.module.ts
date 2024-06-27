import { StatusPagamentoConsumerService } from '@/api/services/messaging/status-pagamento-consumer.service';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
  ],
  providers: [
    StatusPagamentoConsumerService,
  ]
})
export class MessagingModule { }


{

}