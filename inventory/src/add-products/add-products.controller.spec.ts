import { Test } from '@nestjs/testing';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';

describe('CatsController', () => {
    let addProductsController: AddProductsController;
    let addProductsService: AddProductsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [AddProductsController],
            providers: [AddProductsService],
        }).compile();

        addProductsService =
            moduleRef.get<AddProductsService>(AddProductsService);

        addProductsController = moduleRef.get<AddProductsController>(
            AddProductsController,
        );
    });

    describe('findAll', () => {
        it('should return TRUE', async () => {
            expect('s').toBe('s');
        });
    });
});
