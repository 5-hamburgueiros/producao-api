import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsDate, IsDateString } from 'class-validator';

export class CreateProducaoDto {
  @ApiProperty({
    description: 'ID do pedido',
    example: '8b7090a2-682a-421f-86e1-fd4fc098d52a',
  })
  @IsUUID()
  pedido: string;

  @ApiProperty({
    description: 'Data do pedido',
    example: '2024-05-19T20:52:35.166Z',
  })
  @IsDateString()
  dataPedido: Date;
}
