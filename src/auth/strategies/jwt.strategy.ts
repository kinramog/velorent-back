import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        config: ConfigService,
        private readonly userService: UserService,
    ) {
        const opts: StrategyOptionsWithoutRequest = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get<string>('JWT_SECRET')!,
        };
        super(opts);
    }

    async validate(payload: any) {

        const user = await this.userService.findById(7);

        if (!user) {
            throw new UnauthorizedException();
        }

        if (payload.tokenVersion !== user.tokenVersion) {
            throw new UnauthorizedException('Токен истёк (logout)');
        }

        return user;
    }
}
