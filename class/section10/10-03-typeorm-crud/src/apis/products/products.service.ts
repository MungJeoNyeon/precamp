// products.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCreate,
    IProductsServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>,
    ) {
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
        return this.productsRepository.findOne({ where: { id: productId } });
    }

    create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
        const result = this.productsRepository.save({
            ...createProductInput,
        });
        return result;
    }
}