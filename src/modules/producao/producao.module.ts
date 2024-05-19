import { ProducaoController } from '@/api/controllers/producao.contoller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { CreateProducaoUseCase } from '@/application/use-cases';
import { IProducaoRepository } from '@/domain/repository';
import { ICreateProducao } from '@/domain/use-cases';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ProducaoModelTypeOrm]),
  ],
  controllers: [ProducaoController],
  providers: [
    {
      provide: IProducaoRepository,
      useClass: ProducaoRepositoryTypeOrm,
    },
    {
      provide: ICreateProducao,
      useClass: CreateProducaoUseCase,
    },
    // JwtStrategy,
    // { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class ProducaoModule {}
