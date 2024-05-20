import { ProducaoController } from '@/api/controllers/producao.contoller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { ProducaoService } from '@/api/services';
import {
  CreateProducaoUseCase,
  UpdateProducaoUseCase,
} from '@/application/use-cases';
import { FindByPedido } from '@/application/use-cases/producao/find-by-pedido.use-case';
import {
  IProducaoHistoricoRepository,
  IProducaoRepository,
} from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { ICreateProducao, IUpdateProducao } from '@/domain/use-cases';
import { IFindByPedido } from '@/domain/use-cases/producao/find-by-pedido.use-case';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoHistoricoModelTypeOrm } from '@/infra/database/typerom/model/producao-historico.model';
import { ProducaoRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { ProducaoHistoricoRepositoryTypeOrm } from '@/infra/repository/typeorm/producao/producao-historico.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProducaoModelTypeOrm,
      ProducaoHistoricoModelTypeOrm,
    ]),
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
    {
      provide: IUpdateProducao,
      useClass: UpdateProducaoUseCase,
    },
    {
      provide: IFindByPedido,
      useClass: FindByPedido,
    },
    {
      provide: IProducaoService,
      useClass: ProducaoService,
    },
    {
      provide: IProducaoHistoricoRepository,
      useClass: ProducaoHistoricoRepositoryTypeOrm,
    },
  ],
})
export class ProducaoModule {}
