// app.module.ts

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './apis/boards/boards.module';
import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { Product } from './apis/products/entities/product.entity';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { ProductsModule } from './apis/products/products.module';
import { JwtAccessStrategy } from './apis/auth/strategies/jwt-access.strategy';
import { AuthModule } from './apis/auth/auth.module';
import { UsersModule } from './apis/users/users.module';
import { JwtRefreshStrategy } from './apis/auth/strategies/jwt-refresh.strategy';
import { PointsTransactionsModule } from './apis/pointTransactions/pointTransactions.module';
import { PaymentsMoudle } from './apis/payments/payments.module';

@Module({
    imports: [
        AuthModule,
        BoardsModule,
        PaymentsMoudle,
        PointsTransactionsModule,
        ProductsModule,
        ProductsCategoriesModule,
        UsersModule,
        ConfigModule.forRoot(),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }), // req는 기본적으로 들어오지만, res는 이걸 작성해야만 들어옴
        }),
        TypeOrmModule.forRoot({
            type: process.env.DATABASE_TYPE as 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
    providers: [
        JwtAccessStrategy, //
        JwtRefreshStrategy,
    ],
})
export class AppModule {}