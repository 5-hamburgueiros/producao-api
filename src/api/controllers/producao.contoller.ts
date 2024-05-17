import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Itens')
@Controller('itens')
export class ProducaoController {}