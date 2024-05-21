import { StatusPedido } from '@/domain/enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class UpdateProducaoDto {
  @ApiProperty({
    description: 'Status do pedido',
    example: 'PAGO',
    enum: StatusPedido,
  })
  @IsEnum(StatusPedido)
  @IsString()
  status: StatusPedido;
}
