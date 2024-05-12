import { Test, TestingModule } from '@nestjs/testing';
import { MongodbClientService } from './mongodb-client.service';
import { ConfigModule } from '@nestjs/config';

describe('MongodbClientService', () => {
  let service: MongodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongodbClientService],
      exports: [MongodbClientService],
      imports: [ConfigModule.forRoot()],
    }).compile();

    service = module.get<MongodbClientService>(MongodbClientService);
  });

  it('should be defined', async () => {
    const results = await service.connectToMongoDB();
    const expected = true;
    expect(results).toBe(expected);
  });
});
