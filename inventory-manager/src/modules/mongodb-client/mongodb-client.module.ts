import { Module } from '@nestjs/common';
import { MongodbClientService } from './mongodb-client.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [MongodbClientService],
  exports: [MongodbClientService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: './configs/mongodb.env',
      isGlobal: true,
    }),
  ],
})
export class MongodbClientModule {}
