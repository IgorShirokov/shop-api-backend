import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

// tslint:disable-next-line:typedef
async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  // tslint:disable-next-line: typedef
  const options = new DocumentBuilder()
    .setTitle('SHOP-API')
    .setDescription('REST API')
    .setVersion('1.0')
    .build();
  // tslint:disable-next-line: typedef
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const port: string = configService.get('PORT') as string;
  await app.listen(process.env.PORT || port);
}
bootstrap();
