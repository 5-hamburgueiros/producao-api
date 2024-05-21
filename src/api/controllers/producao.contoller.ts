import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ICreateProducao, IUpdateProducao } from '@/domain/use-cases';
import { CreateProducaoDto } from '../dtos';
import { IProducaoService } from '@/domain/service';
import { StatusPedido } from '@/domain/enum';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProducaoModelTypeOrm } from '@/infra/database/typerom/model';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { UpdateProducaoDto } from '../dtos/update-producao';
import { IFindByPedido } from '@/domain/use-cases/producao/find-by-pedido.use-case';

@ApiTags('Produção')
@Controller('producao')
export class ProducaoController {
  constructor(
    @Inject(ICreateProducao)
    private readonly createProducao: ICreateProducao,
    @Inject(IUpdateProducao)
    private readonly updateProducao: IUpdateProducao,
    @Inject(IFindByPedido)
    private readonly findByPedido: IFindByPedido,
    @Inject(IProducaoService)
    private readonly producaoService: IProducaoService,
  ) {}

  @Post()
  async create(@Body() dto: CreateProducaoDto) {
    return await this.createProducao.execute(dto);
  }

  @ApiQuery({
    name: 'pedido',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    enum: StatusPedido,
    type: 'array',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @Get()
  async list(
    @Query('pedido') pedido: string,
    @Query(
      'status',
      new ParseArrayPipe({ optional: true, items: String, separator: ',' }),
    )
    status: Array<StatusPedido>,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<ProducaoModelTypeOrm>> {
    return this.producaoService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3333/producao',
      },
      {
        status,
        pedido,
      },
    );
  }

  @ApiOperation({
    summary: 'Atualiza o pedido (simulação de preparo)',
  })
  @ApiParam({ name: 'pedido' })
  @Patch(':pedido')
  async update(
    @Param('pedido') pedido: string,
    @Body() updateProducaoDto: UpdateProducaoDto,
  ): Promise<ProducaoEntity> {
    return this.updateProducao.execute({ pedido, ...updateProducaoDto });
  }

  @ApiOperation({
    summary: 'Recupera os dados da produção de um pedido',
  })
  @ApiParam({ name: 'pedido' })
  @Get(':pedido')
  async byPedido(
    @Param('pedido') pedido: string,
  ): Promise<ProducaoModelTypeOrm> {
    return this.findByPedido.execute({ pedido });
  }
}
