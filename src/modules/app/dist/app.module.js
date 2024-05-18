"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var typeorm_models_1 = require("@/common/typeorm.models");
var config_1 = require("@/infra/configs/config");
var correlation_service_1 = require("@/infra/correlation/correlation-service");
var http_exception_filter_1 = require("@/infra/exception-filters/http-exception-filter");
var validator_exception_filter_1 = require("@/infra/exception-filters/validator-exception-filter");
var correlation_middleware_1 = require("@/infra/middlewares/correlation/correlation.middleware");
var common_1 = require("@nestjs/common");
var config_2 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var typeorm_1 = require("@nestjs/typeorm");
var database_module_1 = require("../database/database.module");
var health_module_1 = require("../health/health.module");
var producao_module_1 = require("../producao/producao.module");
// import { SeedModule } from '../seed/seed.module';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_2.ConfigModule.forRoot({
                    isGlobal: true,
                    expandVariables: true,
                    load: new config_1.Config().get()
                }),
                typeorm_1.TypeOrmModule.forFeature(typeorm_models_1.typeOrmEntities),
                health_module_1.HealthModule,
                {
                    module: database_module_1.DatabaseModule,
                    global: true
                },
                producao_module_1.ProducaoModule,
            ],
            providers: [
                correlation_service_1.CorrelationService,
                correlation_middleware_1.CorrelationIdMiddleware,
                {
                    provide: core_1.APP_FILTER,
                    useClass: validator_exception_filter_1.ValidatorExceptionFilter
                },
                {
                    provide: core_1.APP_FILTER,
                    useClass: http_exception_filter_1.HttpExceptionFilter
                },
            ],
            exports: [correlation_service_1.CorrelationService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
