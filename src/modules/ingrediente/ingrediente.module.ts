import { IngredienteController } from '@/api/controllers/ingrediente.controller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { IngredienteService } from '@/api/services';
import { CreateIngrendienteUseCase } from '@/application/use-cases/ingrediente/create-ingrediente.use-case';
import { FindAllIngredientsUseCase } from '@/application/use-cases/ingrediente/find-all-ingredientes.use-case';
import { IngredienteEntity } from '@/domain/entities';
import { IIngredienteRepository } from '@/domain/repository';
import { IIngredienteService } from '@/domain/service';
import { ICreateIngrediente, IFindAllIngredientes } from '@/domain/use-cases';
import { IngredienteModelTypeOrm } from '@/infra/database/typerom/model';
import { IngredienteRepositoryTypeOrm } from '@/infra/repository/typeorm/ingrediente/ingrediente.repository';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([IngredienteModelTypeOrm, IngredienteEntity]),
  ],
  controllers: [IngredienteController],
  providers: [
    { provide: IIngredienteRepository, useClass: IngredienteRepositoryTypeOrm },
    { provide: ICreateIngrediente, useClass: CreateIngrendienteUseCase },
    { provide: IFindAllIngredientes, useClass: FindAllIngredientsUseCase },
    { provide: IIngredienteService, useClass: IngredienteService },
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class IngredienteModule {}
