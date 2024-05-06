import { Module } from '@nestjs/common';
import { MongodbHandlerService } from './mongodb-handler.service';

@Module({
    imports: [MongodbHandlerService],
    exports: [MongodbHandlerService],
})
export class MongodbHandlerModule {}
