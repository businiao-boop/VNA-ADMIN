import { ConfigService } from "@nestjs/config";

export const jwtConfig = (configService: ConfigService) => ({
  secret: configService.get("jwt.secret"),
  signOptions: { expiresIn: configService.get("jwt.expiresIn") || "1d" },
});
