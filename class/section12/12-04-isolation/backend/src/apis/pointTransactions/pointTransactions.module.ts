// pointTransactions.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsTransactionsResolver } from './pointTransactions.resolver';
import { PointsTransactionsService } from './pointTransactions.service';
import { PointTransaction } from './entities/pointTransaction.entity';
import { User } from '../users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            PointTransaction, //
            User,
        ]),
    ],
    providers: [
        PointsTransactionsResolver, //
        PointsTransactionsService,
    ],
})
export class PointsTransactionsModule {}