import { DefaultException } from '@/common/exceptions/default.exception';
import { HttpStatus } from '@nestjs/common';

export class PedidoLocalizadoException extends DefaultException {
  constructor(message: string) {
    super('CONFLICT', message, HttpStatus.CONFLICT);
  }
}
