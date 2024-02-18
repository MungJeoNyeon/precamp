// users.resolver.ts

import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService, //
    ) {}

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    fetchUser(
        @Context() context: IContext, //
    ): string {
        // 유저 정보 꺼내오기
        console.log('================');
        console.log(context.req.user);
        console.log('================');
        return '인가에 성공하였습니다.';
    }

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string,
        @Args('password') password: string,
        @Args('name') name: string,
        @Args({ name: 'age', type: () => Int }) age: number,
    ): Promise<User> {
        return this.usersService.create({ email, password, name, age });
    }
}