import { typeOrmEntities } from '@/common/typeorm.models';
import { Config } from '@/infra/configs/config';
import { CorrelationService } from '@/infra/correlation/correlation-service';
import { HttpExceptionFilter } from '@/infra/exception-filters/http-exception-filter';
import { ValidatorExceptionFilter } from '@/infra/exception-filters/validator-exception-filter';
import { CorrelationIdMiddleware } from '@/infra/middlewares/correlation/correlation.middleware';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { HealthModule } from '../health/health.module';
import { ProducaoModule } from '../producao/producao.module';
import { MessagingModule } from '../messaging/messaging.module';
// import { SeedModule } from '../seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: new Config().get(),
    }),
    TypeOrmModule.forFeature(typeOrmEntities),
    HealthModule,
    {
      module: DatabaseModule,
      global: true,
    },
    ProducaoModule,
    // SeedModule,
    MessagingModule
  ],
  providers: [
    CorrelationService,
    CorrelationIdMiddleware,
    {
      provide: APP_FILTER,
      useClass: ValidatorExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [CorrelationService],
})
export class AppModule {}
