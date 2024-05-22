import { FindByPedido } from './find-by-pedido.use-case';
import { IProducaoRepository } from '@/domain/repository';
import { PedidoNaoLocalizadoException } from '@/domain/exceptions/pedido-nao-localizado.exception';
import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

describe('FindByPedido', () => {
  let useCase: FindByPedido;
  let producaoRepository: IProducaoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByPedido,
        { provide: IProducaoRepository, useValue: { findByPedido: jest.fn() } },
      ],
    }).compile();

    useCase = module.get<FindByPedido>(FindByPedido);
    producaoRepository = module.get<IProducaoRepository>(IProducaoRepository);
  });

  it('deve retornar o pedido quando encontrado', async () => {
    const params = { pedido: 'pedido123' };
    const producao = { id: '1', pedido: 'pedido123', status: 'EM_PRODUCAO' };

    jest.spyOn(producaoRepository, 'findByPedido').mockResolvedValue(producao);

    const result = await useCase.execute(params);

    expect(result).toEqual(producao);
    expect(producaoRepository.findByPedido).toHaveBeenCalledWith({ pedido: 'pedido123' });
  });


  it('deve lançar InternalServerErrorException em caso de erro inesperado', async () => {
    const params = { pedido: 'pedido123' };
    const errorMessage = 'Unexpected error';

    jest.spyOn(producaoRepository, 'findByPedido').mockRejectedValue(new Error(errorMessage));

    await expect(useCase.execute(params)).rejects.toThrow(InternalServerErrorException);
    expect(producaoRepository.findByPedido).toHaveBeenCalledWith({ pedido: 'pedido123' });
  });
});
