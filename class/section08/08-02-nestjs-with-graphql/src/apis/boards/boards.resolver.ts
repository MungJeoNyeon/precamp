// boards.resolver.ts

import { Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';

@Resolver()
export class BoardsResolver {
    constructor(private readonly boardsService: BoardsService) {}

    @Query(() => String, { nullable: true }) // nullable 추가
    fetchBoards(): string {
        return this.boardsService.qqq();
    }
}