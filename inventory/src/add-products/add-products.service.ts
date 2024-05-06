import { Injectable } from '@nestjs/common';
import { MongodbHandlerService } from 'src/mongodb-handler/mongodb-handler.service';

@Injectable()
export class AddProductsService {
    constructor(private mongodbHandlerService: MongodbHandlerService) {}

    async addProduct(details) {
        const results = await this.mongodbHandlerService.addProduct(details);
    }
}
