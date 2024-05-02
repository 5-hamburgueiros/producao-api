import {
  ComboModelTypeOrm,
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';

export const typeOrmEntities = [
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
  ComboModelTypeOrm,
];
