// Can change to raw PG instead, but Knex is more familar
module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'development',
    },
    debug: false, // set true for verbose database operations
  },
  test: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'test',
    },
    debug: false, // set true for verbose database operations
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
  },
};
