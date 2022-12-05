import * as process from "process";

export const config = () => ({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
    saltRounds: process.env.JWT_SALT_ROUNDS
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
  },
  bcrypt: {
    saltRounds: process.env.BCRYPT_SALTS
  },
  mailer: {
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      password: process.env.MAILER_PASSWORD,
    }
  }
})
