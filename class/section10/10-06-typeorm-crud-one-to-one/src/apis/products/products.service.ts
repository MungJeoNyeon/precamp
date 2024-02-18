import {
    HttpException,
    HttpStatus,
    Injectable,
    UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import {
    IProductsServiceCheckSoldout,
    IProductsServiceCreate,
    IProductsServiceDelete,
    IProductsServiceFindOne,
    IProductsServiceUpdate,
} from './interfaces/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>, //
        private readonly productsSaleslocationService: ProductsSaleslocationsService
    ) {
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find({
            relations: ['productSaleslocation', 'productCategory'],
        });
    }

    findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
        return this.productsRepository.findOne({
            where: { id: productId },
            relations: ['productSaleslocation', 'productCategory'],
        });
    }

    async create({
                     createProductInput,
                 }: IProductsServiceCreate): Promise<Product> {
        // 1. 상품만 등록하는 경우
        // const result = this.productsRepository.save({
        //   ...createProductInput,

        //   // 하나하나 직접 나열하는 방식
        //   //   name: '마우스',
        //   //   description: '좋은 마우스',
        //   //   price: 3000,
        // });

        // 2. 상품과 상품거래위치를 같이 등록하는 경우
        const { productSaleslocation, productCategoryId, ...product } =
            createProductInput;

        const result = await this.productsSaleslocationService.create({
            ...productSaleslocation,
        }); // 서비스를 타고 가는 이유는...?(레파지토리에 직접 접근하면 안될까...?) => 검증을 서비스에서 진행하기 때문

        const result2 = await this.productsRepository.save({
            ...product,
            productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
            productCategory: {
                id: productCategoryId,
                // 만약에, name 까지 받고싶으면 2가지 방법?
                //   1) createProductInput에서 카테고리 name도 받아오기
                //   2) productCategoryId를 사용해서 카테고리 name을 조회하기
            },
        });

        // 최종 결과 돌려주기
        return result2;
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

    async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
        try {
            // Actual deletion
            //const result = await this.productsRepository.delete({ id: productId });
            //return !!result.affected;

            // 5. 소프트 삭제(TypeORM 제공) - softDelete
            const result2 = await this.productsRepository.softDelete({ id: productId }); // 장점: 다른 컬럼으로도 삭제 가능
            return !!result2.affected; //                                   // 단점: 여러ID 한번에 지우기 불가능
        } catch (error) {
            console.error('Failed to delete product:', error);
            throw error; // Rethrow the error for further handling up the call stack
        }
    }


}