import { Options } from "@mikro-orm/core";
import { User } from "./entities/User";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const config: Options = {
  driver: PostgreSqlDriver,
  host: "localhost",
  user: "root",
  password: "root123",
  dbName: "chat-room",
  entities: [User],
  debug: true,
  migrations: {
    path: "./dist/migrations", // compiled JS files
    pathTs: "./src/infra/db/migrations", // source TS files
    glob: "!(*.d).{js,ts}", // handles both ts and js files
  },
};

export default config;
