// products.service.ts

import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCheckSoldout,
    IProductsServiceCreate,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>, //
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

    async update({
                     productId,
                     updateProductInput,
                 }: IProductsServiceUpdate): Promise<Product> {
        const product = await this.findOne({ productId });

        this.checkSoldout({ product });

        const result = await this.productsRepository.save({
            ...product, // Use spread operator to merge the product with updates
            ...updateProductInput,
        });

        return result;
    }

    // 추가
    checkSoldout({ product }: IProductsServiceCheckSoldout): void {
        if (product.isSoldout)
            throw new UnprocessableEntityException('이미 판매 완료된 상품입니다');
    }
}