import { StatusPedido } from '@/domain/enum';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ProducaoHistoricoEntity } from '@/domain/entities/producao-historico.entity';
import { ProducaoModelTypeOrm } from './producao.typeorm.model';

@Entity({ name: 'Producao_Historico' })
@Index(['id'])
export class ProducaoHistoricoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @ManyToOne(() => ProducaoModelTypeOrm, { nullable: true })
  @JoinTable({ name: 'producaoId' })
  producao: string;

  @Column({
    type: 'enum',
    enum: StatusPedido,
  })
  status: StatusPedido;

  static FromEntity(
    params: ProducaoHistoricoEntity,
  ): ProducaoHistoricoModelTypeOrm {
    const model = new ProducaoHistoricoModelTypeOrm();
    model.id = params.id;
    model.producao = params.producao;
    model.status = params.status;
    model.criadoEm = params.criadoEm;
    model.atualizadoEm = params.atualizadoEm;
    return model;
  }
}
