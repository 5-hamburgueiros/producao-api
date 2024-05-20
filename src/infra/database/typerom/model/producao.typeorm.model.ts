import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ProducaoEntity } from '@/domain/entities/producao.entity';
import { StatusPedido } from '@/domain/enum';
import { ProducaoHistoricoModelTypeOrm } from './producao-historico.model';

@Entity({ name: 'Producao' })
@Index(['id'])
export class ProducaoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'pedido', type: 'uuid', nullable: true })
  pedido: string;

  @Column({ type: 'enum', enum: StatusPedido, default: StatusPedido.RECEBIDO })
  status: StatusPedido;

  @Column({ type: 'timestamptz', nullable: true })
  dataPedido: Date;

  @OneToMany(
    () => ProducaoHistoricoModelTypeOrm,
    (historico) => historico.producao,
  )
  historico: Array<ProducaoHistoricoModelTypeOrm>;

  static FromEntity(params: ProducaoEntity): ProducaoModelTypeOrm {
    const model = new ProducaoModelTypeOrm();
    model.id = params.id;
    model.pedido = params.pedido;
    model.status = params.status;
    model.dataPedido = params.dataPedido;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
