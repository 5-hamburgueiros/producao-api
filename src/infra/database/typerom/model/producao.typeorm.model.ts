import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { StatusPedido } from '@/domain/enum';

@Entity({ name: 'Item' })
@Index(['id'])
export class ProducaoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Pedido', type: 'uuid' })
  pedido: string;

  @Column({type: 'enum', enum: StatusPedido, default: StatusPedido.EM_ANDAMENTO})
  status: StatusPedido;

  static FromEntity(params: ProducaoEntity): ProducaoModelTypeOrm {
    const model = new ProducaoModelTypeOrm();
    model.id = params.id;
    model.pedido = params.pedido;
    model.status = params.status;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}