import { ProducaoController } from '@/api/controllers/producao.contoller';
import { ProducaoService } from '@/api/services';
import { PedidoService } from '@/api/services/pedido.service';
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
import { IPedidoService } from '@/domain/service/pedido.service';
import { ICreateProducao, IUpdateProducao } from '@/domain/use-cases';
import { IFindByPedido } from '@/domain/use-cases/producao/find-by-pedido.use-case';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoHistoricoModelTypeOrm } from '@/infra/database/typerom/model/producao-historico.model';
import { ProducaoRepositoryTypeOrm } from '@/infra/repository/typeorm';
import { ProducaoHistoricoRepositoryTypeOrm } from '@/infra/repository/typeorm/producao/producao-historico.repository';
import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const services: Provider[] = [
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
    provide: IPedidoService,
    useClass: PedidoService,
  },
  {
    provide: IProducaoHistoricoRepository,
    useClass: ProducaoHistoricoRepositoryTypeOrm,
  },
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProducaoModelTypeOrm,
      ProducaoHistoricoModelTypeOrm,
    ]),
  ],
  controllers: [ProducaoController],
  providers: [
    ...services,
  ],
  exports: [...services]
})
export class ProducaoModule { }
