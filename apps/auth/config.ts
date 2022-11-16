export const config = () => ({
  port: process.env.PORT,
  jwt: {
    secret: process.env.JWT_SECRET,
    saltRounds: process.env.JWT_SALT_ROUNDS
  },
  database: {
    uri: process.env.MONGO_URI,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
  }
})
