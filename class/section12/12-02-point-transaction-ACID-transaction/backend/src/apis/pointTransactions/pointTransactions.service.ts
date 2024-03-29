// pointsTransactions.service.ts


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
    PointTransaction,
    POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/point-transactions-service.interface';

@Injectable()
export class PointsTransactionsService {
    constructor(
        @InjectRepository(PointTransaction)
        private readonly pointsTransactionsRepository: Repository<PointTransaction>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly dataSource: DataSource,
    ) {
    }

    async create({
                     impUid,
                     amount,
                     user: _user,
                     // }: IPointsTransactionsServiceCreate): Promise<PointTransaction> { // Error 발생을 위해 잠시 return 타입 주석
                 }: IPointsTransactionsServiceCreate) {

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // 1. PointTransaction 테이블에 거래기록 1줄 생성
            const pointTransaction = this.pointsTransactionsRepository.create({
                impUid,
                amount,
                user: _user,
                status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            // await this.pointsTransactionsRepository.save(pointTransaction);
            await queryRunner.manager.save(pointTransaction); // queryRunner를 통해서 저장해야만 트랜잭션 먹힘

            throw new Error('강제로 에러 발생!!!');

            // 2. 유저의 돈 찾아오기
            // const user = await this.usersRepository.findOne({
            //   where: { id: _user.id },
            // });
            const user = await queryRunner.manager.findOne(User, {
                where: { id: _user.id },
            });

            // 3. 유저의 돈 업데이트하기
            // await this.usersRepository.update(
            //   { id: _user.id },
            //   { point: user.point + amount },
            // );
            const updatedUser = this.usersRepository.create({
                ...user,
                point: user.point + amount,
            });
            await queryRunner.manager.save(updatedUser);
            await queryRunner.commitTransaction();

            // 4. 최종결과 브라우저에 돌려주기
            return pointTransaction;
        } catch (error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release(); // 주석걸면, commit 끝나도 커넥션이 안 끊겨서 문제됨 (하지만, 에러나면 자동끊김)
        }
    }
}