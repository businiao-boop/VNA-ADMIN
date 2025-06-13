import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";

// import { config } from "dotenv";
// config({ path: [".env.local", `.env.${process.env.NODE_ENV}`, ".env"] });
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
export const typeOrmConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "mysql",
  host: configService.get("database.host"),
  port: configService.get("database.port"),
  username: configService.get("database.username"),
  password: configService.get("database.password"),
  database: configService.get("database.name"),
  autoLoadEntities: true,
  synchronize: true,
  // logging: true,
  // entities: ["dist/modules/**/*.entity{.ts,.js}"],
});

// const dataSourceOptions: DataSourceOptions = {
//   type: "mysql",
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT || "3306"),
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   // entities: ['dist/modules/**/*.entity{.ts,.js}'],
//   synchronize: true, // 生产环境设为 false
// };
// const dbRegToken = "database";

// export const DatabaseConfig = registerAs(
//   dbRegToken,
//   (): DataSourceOptions => dataSourceOptions
// );
// const dataSource = new DataSource(dataSourceOptions);

// export default dataSource;
