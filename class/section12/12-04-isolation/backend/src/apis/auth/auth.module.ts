// auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from 'src/apis/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from 'src/apis/auth/strategies/jwt-refresh.strategy';

@Module({
    imports: [
        JwtModule.register({}),
        UsersModule, //
    ],
    providers: [
        JwtAccessStrategy,
        JwtRefreshStrategy,
        AuthResolver, //
        AuthService,
    ],
})
export class AuthModule {}