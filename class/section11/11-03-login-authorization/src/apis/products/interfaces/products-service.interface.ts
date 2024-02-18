// products-service.interface.ts

import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

export interface IProductsServiceCreate {
    createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
    productId: string;
}


export interface IProductsServiceUpdate {
    productId: string;
    updateProductInput: UpdateProductInput;
}


// 추가
export interface IProductsServiceCheckSoldout {
    product: Product;
}

export interface IProductsServiceDelete {
    productId: string;
}