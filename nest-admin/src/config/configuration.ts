export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT || "3000"),
    prefix: process.env.APP_PREFIX,
    host: process.env.APP_HOST,
  },
  database: {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASS,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "%#*a^r@!n(&o*",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },
});
