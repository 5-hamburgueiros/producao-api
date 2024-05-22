import { UpdateProducaoUseCase } from './update-producao.use-case';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { StatusPedido } from '@/domain/enum';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import { StatusNaoPermitidoException } from '@/domain/exceptions/status-nao-permitido.exeception';
import { DefaultException } from '@/common/exceptions/default.exception';
import { IProducaoRepository, IProducaoHistoricoRepository } from '@/domain/repository';
import { IProducaoService } from '@/domain/service';
import { IPedidoService } from '@/domain/service/pedido.service';
import { environment } from '@/infra/configs/environment';
import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';

describe('UpdateProducaoUseCase', () => {
  let useCase: UpdateProducaoUseCase;
  let producaoRepository: IProducaoRepository;
  let producaoHistoricoRepository: IProducaoHistoricoRepository;
  let producaoService: IProducaoService;
  let pedidoService: IPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducaoUseCase,
        { provide: IProducaoRepository, useValue: { create: jest.fn() } },
        { provide: IProducaoHistoricoRepository, useValue: { create: jest.fn() } },
        { provide: IProducaoService, useValue: { paginate: jest.fn() } },
        { provide: IPedidoService, useValue: { update: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<UpdateProducaoUseCase>(UpdateProducaoUseCase);
    producaoRepository = module.get<IProducaoRepository>(IProducaoRepository);
    producaoHistoricoRepository = module.get<IProducaoHistoricoRepository>(IProducaoHistoricoRepository);
    producaoService = module.get<IProducaoService>(IProducaoService);
    pedidoService = module.get<IPedidoService>(IPedidoService);
  });

  it('deve atualizar a produção com sucesso', async () => {
    jest.spyOn(environment, 'isProduction').mockReturnValue(false);
    const params = { pedido: 'pedido123', status: StatusPedido.EM_PREPARACAO };
    const producao = new ProducaoEntity({ id: '1', pedido: 'pedido123', status: StatusPedido.RECEBIDO });
    const paginatedResult = { items: [producao], meta: { itemCount: 1 } };
    const updatedProducao = new ProducaoEntity({ id: '1', pedido: 'pedido123', status: StatusPedido.EM_PREPARACAO });

    jest.spyOn(producaoService, 'paginate').mockResolvedValue(paginatedResult);
    jest.spyOn(producaoRepository, 'create').mockResolvedValue(updatedProducao);
    jest.spyOn(producaoHistoricoRepository, 'create').mockResolvedValue(new ProducaoHistoricoEntity({ producao: '1', status: StatusPedido.EM_PREPARACAO }));

    const result = await useCase.execute(params);

    expect(result).toEqual(updatedProducao);
    expect(producaoService.paginate).toHaveBeenCalledWith({ limit: 1, page: 1 }, { pedido: 'pedido123' });
    expect(producaoRepository.create).toHaveBeenCalledWith({ producao: updatedProducao });
    expect(producaoHistoricoRepository.create).toHaveBeenCalled();
    expect(pedidoService.update).not.toHaveBeenCalled();
  });

  it('deve lançar exceção quando o pedido não é encontrado', async () => {
    const params = { pedido: 'pedido123', status: StatusPedido.EM_PREPARACAO };
    const paginatedResult = { items: [], meta: { itemCount: 0 } };

    jest.spyOn(producaoService, 'paginate').mockResolvedValue(paginatedResult);

    await expect(useCase.execute(params)).rejects.toThrow(PedidoNaoLocalizadoException);
    expect(producaoService.paginate).toHaveBeenCalledWith({ limit: 1, page: 1 }, { pedido: 'pedido123' });
  });

  it('deve lançar exceção quando o status não é permitido', async () => {
    const params = { pedido: 'pedido123', status: 'INVALID_STATUS' as StatusPedido };
    const producao = new ProducaoEntity({ id: '1', pedido: 'pedido123', status: StatusPedido.RECEBIDO });
    const paginatedResult = { items: [producao], meta: { itemCount: 1 } };

    jest.spyOn(producaoService, 'paginate').mockResolvedValue(paginatedResult);

    await expect(useCase.execute(params)).rejects.toThrow(StatusNaoPermitidoException);
    expect(producaoService.paginate).toHaveBeenCalledWith({ limit: 1, page: 1 }, { pedido: 'pedido123' });
  });

  it('deve lançar InternalServerErrorException em caso de erro inesperado', async () => {
    const params = { pedido: 'pedido123', status: StatusPedido.EM_PREPARACAO };
    const errorMessage = 'Unexpected error';

    jest.spyOn(producaoService, 'paginate').mockRejectedValue(new Error(errorMessage));

    await expect(useCase.execute(params)).rejects.toThrow(InternalServerErrorException);
    expect(producaoService.paginate).toHaveBeenCalledWith({ limit: 1, page: 1 }, { pedido: 'pedido123' });
  });
});
