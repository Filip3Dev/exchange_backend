import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserResponseDto, CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { UserRepository } from "./user.repository";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  private _saltRounds = parseInt(process.env.SALT_ROUNDS);

  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async getUserById(id: string): Promise<User> {
  	const user = await this._userRepository.findOneUser(id);

  	if (!user) throw new NotFoundException("User not found");

  	return user;
  }

  async findOneByEmail(email: string): Promise<User> {
  	return await this._userRepository.findOneByEmail(email);
  }

  async create(userDto: CreateUserDto): Promise<UserResponseDto> {
  	userDto.password = await this.encryptPassword(userDto.password);

  	return await this._userRepository.createUser(userDto);
  }

  async findByPayload({ username }): Promise<UserResponseDto | any> {
  	return await this._userRepository.findByPayload({ username });
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserResponseDto> {
  	const user = await this._userRepository.findOneUser(id);

  	if (!user) throw new NotFoundException("User not found");

  	if (userDto.oldpassword && userDto.password) {
  		const isOldPasswordValid = await this.verifyPassword(
  			userDto.oldpassword,
  			user.password
  		);

  		if (!isOldPasswordValid)
  			throw new BadRequestException("Current password not valid!");

  		userDto.password = await this.encryptPassword(userDto.password);
  	}
  	delete userDto.oldpassword;
  	const updatedUser = await this._userRepository.updateUser(id, userDto);

  	return updatedUser;
  }

  /* ---- Auxiliary Methods ---- */

  async encryptPassword(password: string): Promise<string> {
  	const encryptedPassword = await bcrypt.hash(password, this._saltRounds);
  	return encryptedPassword;
  }

  async verifyPassword(
  	password: string,
  	encryptedPassword: string
  ): Promise<boolean> {
  	const isValid = await bcrypt.compare(password, encryptedPassword);
  	return isValid;
  }
}
