import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

export type PayloadDto = {
  userId: number;
  username: string;
  permissionKeys?: string[];
};


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt.secret"),
    });
  }

  async validate(payload: any): Promise<PayloadDto> {
    // 这里返回的内容将会附加到 request.user
    return {
      userId: payload.sub,
      username: payload.username,
      permissionKeys: payload.permissionKeys,
    };
  }
}
