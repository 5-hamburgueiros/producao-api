import { CreateProducaoUseCase } from './create-producao.use-case';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import { PedidoLocalizadoException } from '@/domain/exceptions/pedido-localizado.exception';
import { IProducaoRepository, IProducaoHistoricoRepository } from '@/domain/repository';
import { IPedidoService } from '@/domain/service/pedido.service';
import { environment } from '@/infra/configs/environment';
import { Test, TestingModule } from '@nestjs/testing';

describe('CreateProducaoUseCase', () => {
  let useCase: CreateProducaoUseCase;
  let producaoRepository: IProducaoRepository;
  let producaoHistoricoRepository: IProducaoHistoricoRepository;
  let pedidoService: IPedidoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducaoUseCase,
        { provide: IProducaoRepository, useValue: { findByPedido: jest.fn(), create: jest.fn() } },
        { provide: IProducaoHistoricoRepository, useValue: { create: jest.fn() } },
        { provide: IPedidoService, useValue: { get: jest.fn(), update: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<CreateProducaoUseCase>(CreateProducaoUseCase);
    producaoRepository = module.get<IProducaoRepository>(IProducaoRepository);
    producaoHistoricoRepository = module.get<IProducaoHistoricoRepository>(IProducaoHistoricoRepository);
    pedidoService = module.get<IPedidoService>(IPedidoService);
  });

  it('deve criar uma produção com sucesso em ambiente de desenvolvimento', async () => {
    jest.spyOn(environment, 'isProduction').mockReturnValue(false);
    const params = { pedido: 'pedido123', dataPedido: new Date() };
    const createdProducao = new ProducaoEntity(params);

    jest.spyOn(producaoRepository, 'findByPedido').mockResolvedValue(null);
    jest.spyOn(producaoRepository, 'create').mockResolvedValue(createdProducao);
    jest.spyOn(producaoHistoricoRepository, 'create').mockResolvedValue(new ProducaoHistoricoEntity({ producao: createdProducao.id, status: createdProducao.status }));

    const result = await useCase.execute(params);

    expect(result).toEqual(createdProducao);
    expect(producaoRepository.findByPedido).toHaveBeenCalledWith({ pedido: 'pedido123' });
    expect(producaoHistoricoRepository.create).toHaveBeenCalled();
    expect(pedidoService.get).not.toHaveBeenCalled();
    expect(pedidoService.update).not.toHaveBeenCalled();
  });

  it('deve criar uma produção com sucesso em ambiente de produção', async () => {
    jest.spyOn(environment, 'isProduction').mockReturnValue(true);
    const params = { pedido: 'pedido123', dataPedido: new Date() };
    const createdProducao = new ProducaoEntity(params);

    jest.spyOn(pedidoService, 'get').mockResolvedValue({ id: 'pedido123' });
    jest.spyOn(producaoRepository, 'findByPedido').mockResolvedValue(null);
    jest.spyOn(producaoRepository, 'create').mockResolvedValue(createdProducao);
    jest.spyOn(producaoHistoricoRepository, 'create').mockResolvedValue(new ProducaoHistoricoEntity({ producao: createdProducao.id, status: createdProducao.status }));
    jest.spyOn(pedidoService, 'update').mockResolvedValue(null);

    const result = await useCase.execute(params);

    expect(result).toEqual(createdProducao);
    expect(producaoRepository.findByPedido).toHaveBeenCalledWith({ pedido: 'pedido123' });
    expect(producaoHistoricoRepository.create).toHaveBeenCalled();
    expect(pedidoService.get).toHaveBeenCalledWith('pedido123');
    expect(pedidoService.update).toHaveBeenCalledWith('pedido123', createdProducao.status);
  });

  it('deve lançar exceção quando pedido já está cadastrado na produção', async () => {
    const params = { pedido: 'pedido123', dataPedido: new Date() };

    jest.spyOn(environment, 'isProduction').mockReturnValue(false);
    jest.spyOn(producaoRepository, 'findByPedido').mockResolvedValue(new ProducaoEntity(params));

    await expect(useCase.execute(params)).rejects.toThrow(PedidoLocalizadoException);
  });

  it('deve lançar exceção quando pedido não é encontrado em ambiente de produção', async () => {
    const params = { pedido: 'pedido123', dataPedido: new Date() };

    jest.spyOn(environment, 'isProduction').mockReturnValue(true);
    jest.spyOn(pedidoService, 'get').mockResolvedValue(null);

    await expect(useCase.execute(params)).rejects.toThrow(PedidoNaoLocalizadoException);
  });
});
