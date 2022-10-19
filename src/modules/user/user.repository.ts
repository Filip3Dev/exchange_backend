import { UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
	async findOneUser(id: string): Promise<User> {
		return await User.findOneOrFail({ id });
	}

	async findByPayload(query: Record<string, any>): Promise<User[]> {
		return await User.find({ ...query });
	}

	async findOneByEmail(email: string): Promise<User> {
		return await User.findOneOrFail({ email });
	}

	createUser(user: CreateUserDto): Promise<User> {
		const newUser = User.create(user);
		return newUser.save();
	}

	async updateUser(id: string, user: UpdateUserDto): Promise<User> {
		const updatedUser = await User.update({ id }, user);

		if (!updatedUser) {
			throw new UnauthorizedException();
		}

		const updated = await User.findOneOrFail({ id });

		return updated;
	}
}
