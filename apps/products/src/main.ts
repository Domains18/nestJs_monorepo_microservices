//@ts-ignore
import { PRODUCTS_PACKAGE_NAME } from '../../../types/proto/products';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
    const app =
        (await NestFactory.createMicroservice)<MicroserviceOptions>(AppModule, {
            transport: Transport.GRPC,
            options: {
              package: PRODUCTS_PACKAGE_NAME,
              protoPath: join(__dirname, 'proto/products.proto')
            },
        });
    Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
