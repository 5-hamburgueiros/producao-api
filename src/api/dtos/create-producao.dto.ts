import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class CreateProducaoDto {
    @ApiProperty({
        description: 'ID do pedido',
        example: '8b7090a2-682a-421f-86e1-fd4fc098d52a',
    })
    @IsUUID()
    pedido: string;

    @ApiProperty({
        description: 'ID do cliente',
        example: 'b77ea307-e95c-4b20-8618-b8c3b1371307',
    })
    @IsUUID()
    cliente: string;
}
