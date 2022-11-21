export interface IDatabaseOptions {
  type: 'mongodb' | 'mysql', // Add as more type of database as u want
  logging: boolean,
  migrations: Array<string>,
  entities: Array<string>
}
