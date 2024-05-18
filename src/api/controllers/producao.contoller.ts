import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { ICreateProducao } from '@/domain/use-cases';
import { CreateProducaoDto } from "../dtos";

@ApiTags('Produção')
@Controller('producao')
export class ProducaoController {
    constructor(
        @Inject(ICreateProducao)
        private readonly createProducao: ICreateProducao,
    ) {}

    @Post()
  async create(@Body() dto: CreateProducaoDto) {
    return this.createProducao.execute(dto);
  }

  @ApiParam({ name: 'pedido' })
  @Get(':documento')
  async findByPedido(@Param('pedido') pedido: string) {
    console.log(pedido)
    return null;
  }
}