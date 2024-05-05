import { Test } from '@nestjs/testing';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';

describe('CatsController', () => {
    let catsController: AddProductsController;
    let catsService: AddProductsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AddProductsController],
            providers: [AddProductsService],
        }).compile();

        catsService = moduleRef.get<AddProductsService>(AddProductsService);
        catsController = moduleRef.get<AddProductsController>(
            AddProductsController,
        );
    });

    describe('findAll', () => {
        it('should return TRUE', async () => {});
    });
});
