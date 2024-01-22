import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationContext } from 'graphql';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://127.0.0.1:5173',
    methods: ['GET,PUT,PATCH,POST,DELETE'],
    credentials: true,
    allowedHeaders: [
      'Content-Type',
      'apollo-require-preflight',
      'X-Requested-With',
      'Accept',
      'Authorization',
    ],
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, error) => {
          acc[error.property] = Object.values(error.constraints).join(',');
          return acc;
        }, {});
        throw new BadRequestException(formattedErrors);
      },
    }),
  );
  /*
  [
    {
      property:"username",
      constraints:{
        isString:"must be string",
        minLength:"min length must be 4"
        //Object.Values
      }
    },
    {
      property:"username",
      constraints:{
        isString:"must be string",
        minLength:"min length must be 4"
      }
    }
  ]
  we will convert this to this ->username:"must be string,min length must be 4"
  */
  await app.listen(3000);
}
bootstrap();
