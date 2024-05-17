import {
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AbstractModel } from './abstract.typeorm.model';
import { ProducaoEntity } from '@/domain/entities/producao.entity';

@Entity({ name: 'Item' })
@Index(['id'])
export class ProducaoModelTypeOrm extends AbstractModel {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  static FromEntity(params: ProducaoEntity): ProducaoModelTypeOrm {
    const model = new ProducaoModelTypeOrm();
    model.id = params.id;
    return model;
  }
}
