import { ProducaoController } from '@/api/controllers/producao.contoller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { ProducaoService } from '@/api/services';
import {
  CreateProducaoUseCase,
  UpdateProducaoUseCase,
} from '@/application/use-cases';
import { IProducaoRepository } from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { ICreateProducao, IUpdateProducao } from '@/domain/use-cases';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProducaoModelTypeOrm])],
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
    {
      provide: IUpdateProducao,
      useClass: UpdateProducaoUseCase,
    },
    {
      provide: IProducaoService,
      useClass: ProducaoService,
    },
  ],
})
export class ProducaoModule {}
