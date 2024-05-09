import { Module } from '@nestjs/common';
import { MongodbHandlerService } from './mongodb-handler.service';
import { ConfigService } from '@nestjs/config';
import { MongoDBConfigs } from 'constants/development_constants';

@Module({
    imports: [MongodbHandlerService, ConfigService ],
    providers: [MongodbHandlerService,],
    exports: [MongodbHandlerService],
})
export class MongodbHandlerModule {}
