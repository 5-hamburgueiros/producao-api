import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { npm_package_version: VERSION = '0.1.0', NODE_ENV, URL_SWAGGER__AWS } = process.env;
export class SwaggerStartup {
  static init(app: INestApplication, port: number) {
    const config = new DocumentBuilder()
      .setTitle('Tech Challenge - Produção API')
      .setExternalDoc('Exportar documentação', '/swagger-json')
      .setDescription('Sistema de gestão de produção')
      // .addBearerAuth()
      .setVersion(VERSION);

    if (NODE_ENV == 'production') {
      config.addServer(
        URL_SWAGGER__AWS,
        'AWS EKS',
      );
      config.addServer(
        'http://localhost:30001',
        'Production server with kubernetes locally',
      );
      config.addServer(
        'http://localhost:3333',
        'Production server with docker',
      );
    } else {
      config.addServer(`http://localhost:${port}`, 'Development server');
    }

    const document = SwaggerModule.createDocument(app, config.build());
    SwaggerModule.setup('swagger', app, document);
  }
}
