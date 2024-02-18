// boards.service.ts

import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
    qqq(): string {
        return 'Hello World!';
    }
}