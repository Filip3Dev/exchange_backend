import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "./database-entities";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: "mysql",
			host: process.env.DATABASE_HOST,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE_NAME,
			entities: entities,
			logging: true,
		}),
	],
	providers: [],
	exports: [],
})
export class DatabaseModule {}
