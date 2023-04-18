module.exports = {
  default: {
    driver: "pg",
    connectionString: {
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
    },
    pool: {},
  },
  development: {
    driver: "pg",
    connectionString: {
      host: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
    },
    pool: {},
  },
  // Add configurations for other environments if needed
};
