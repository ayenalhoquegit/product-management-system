import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();
const dbHost = process.env.DB_HOST || "localhost";
const dbUser = process.env.DB_USER || "";
const dbPassword = process.env.DB_PASSWORD || "";
const dbName = process.env.DB_NAME || "";

const development: Knex.Config = {
  client: "mysql",
  connection: {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  },
  migrations: {
    extension: "ts",
    directory: "./migrations",
  },
  seeds: {
    extension: "ts",
    directory: "./seeds",
  },
};

export default development;

// export = {
//   development,
// };
