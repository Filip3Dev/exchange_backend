import { entities } from "./src/modules/shared/database/database-entities";
import { ConnectionOptions } from "typeorm";

const config: ConnectionOptions = {
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	synchronize: true,
	entities: entities,
	migrationsTableName: "migrations",
	migrations: [__dirname + "/src/migrations/**/*{.ts,.js}"],
	cli: {
		migrationsDir: "src/migrations",
	},
	logging: true,
};

export = config
