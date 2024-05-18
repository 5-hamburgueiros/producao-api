"use strict";
exports.__esModule = true;
exports.SwaggerStartup = void 0;
var swagger_1 = require("@nestjs/swagger");
var _a = process.env, _b = _a.npm_package_version, VERSION = _b === void 0 ? '0.1.0' : _b, NODE_ENV = _a.NODE_ENV;
var SwaggerStartup = /** @class */ (function () {
    function SwaggerStartup() {
    }
    SwaggerStartup.init = function (app) {
        var config = new swagger_1.DocumentBuilder()
            .setTitle('Tech Challenge - Backend')
            .setExternalDoc('Exportar documentação', '/swagger-json')
            .setDescription('Sistema de gestão de produção')
            .addBearerAuth()
            .setVersion(VERSION);
        if (NODE_ENV == 'production') {
            config.addServer('http://a06c69a4a4a89422aab39ed7f596ecea-335050858.us-east-1.elb.amazonaws.com', 'AWS EKS');
            config.addServer('http://localhost:30001', 'Production server with kubernetes locally');
            config.addServer('http://localhost:3333', 'Production server with docker');
        }
        else {
            config.addServer('http://localhost:3000', 'Development server');
        }
        var document = swagger_1.SwaggerModule.createDocument(app, config.build());
        swagger_1.SwaggerModule.setup('swagger', app, document);
    };
    return SwaggerStartup;
}());
exports.SwaggerStartup = SwaggerStartup;
