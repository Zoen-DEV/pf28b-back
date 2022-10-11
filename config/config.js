require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "gztnqlsasdafwr",
    password: "d4f5989b572df9e28f20c0001d2d93d2091e26652dfe929fa22bf26f7c7e6a0c",
    database: "danhsa6go68t35",

    host: "ec2-23-20-140-229.compute-1.amazonaws.com",
    dialect: "postgres",
  },
};
