import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongodbClientProvider } from './providers/mongodb-client.provider';
import { LoggerProvider } from './providers/logger.provider';
import { OperationMessagesProvider } from './providers/operationsMessages';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['main.env', './configs/mongodb.env'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MongodbClientProvider,
    LoggerProvider,
    OperationMessagesProvider,
  ],
  exports: [],
})
export class AppModule {}
