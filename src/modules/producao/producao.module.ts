import { ProducaoController } from '@/api/controllers/producao.contoller';
import { JwtGuard } from '@/api/middlewares/auth-guard.strategy';
import { JwtStrategy } from '@/api/middlewares/jwt.strategy';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [ProducaoController],
  providers: [
    // {
    //   provide: IItemRepository,
    //   useClass: ItemRepositoryTypeOrm,
    // },
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class ProducaoModule {}
