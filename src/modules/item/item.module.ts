import { ItemController } from '@/api/controllers/item.controller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { ItemService } from '@/api/services';
import { CreateItemUseCase } from '@/application/use-cases/item/create-item.use-case';
import { FindAllItensUseCase } from '@/application/use-cases/item/find-all-itens.use-case';
import { IIngredienteRepository, IItemRepository } from '@/domain/repository';
import { IItemService } from '@/domain/service';
import { ICreateItem, IFindAllItens } from '@/domain/use-cases';
import {
  IngredienteModelTypeOrm,
  ItemModelTypeOrm,
} from '@/infra/database/typerom/model';
import { IngredienteRepositoryTypeOrm } from '@/infra/repository/typeorm/ingrediente/ingrediente.repository';
import { ItemRepositoryTypeOrm } from '@/infra/repository/typeorm/item/item.repository';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([ItemModelTypeOrm, IngredienteModelTypeOrm]),
  ],
  controllers: [ItemController],
  providers: [
    { provide: IIngredienteRepository, useClass: IngredienteRepositoryTypeOrm },
    { provide: IItemRepository, useClass: ItemRepositoryTypeOrm },
    { provide: ICreateItem, useClass: CreateItemUseCase },
    { provide: IFindAllItens, useClass: FindAllItensUseCase },
    { provide: IItemService, useClass: ItemService },
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class ItemModule {}
