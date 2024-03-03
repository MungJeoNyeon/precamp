// pointTransaction.entity.ts

import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/users/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
    PAYMENT = 'PAYMENT',
    CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
    name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointTransaction {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String)
    id: string;

    @Column()
    @Field(() => String)
    impUid: string;

    @Column()
    @Field(() => Int)
    amount: number;

    // 정해진 문자열만 들어갈 수 있게 enum 타입을 설정
    @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
    @Field(() => POINT_TRANSACTION_STATUS_ENUM)
    status: string;

    // 유저 한 명 당 여러 번의 결제를 할 수 있기에 ManyToOne 으로 연결
    @ManyToOne(() => User)
    @Field(() => User)
    user: User;

    // DB에 저장될 때, 자동으로 시간 생성되어 저장
    @CreateDateColumn()
    @Field(() => Date)
    createdAt: Date;
}