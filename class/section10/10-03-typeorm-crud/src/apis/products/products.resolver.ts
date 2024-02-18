// products.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly productsService: ProductsService, //
    ) {}

    @Query(() => [Product])
    fetchProducts(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Query(() => Product)
    fetchProduct(
        @Args('productId') productId: string, //
    ): Promise<Product> {
        return this.productsService.findOne({ productId });
    }

    @Mutation(() => Product)
    createProduct(
        @Args('createProductInput') createProductInput: CreateProductInput,
    ): Promise<Product> {
        return this.productsService.create({ createProductInput });
    }
}