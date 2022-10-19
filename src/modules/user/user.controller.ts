import {
	Body,
	Controller,
	Get,
	Post,
	Put,
	Req,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto, UserResponseDto, UpdateUserDto } from "./dto/user.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard())
	async getUserById(@Req() req: any): Promise<UserResponseDto> {
		const user: UserResponseDto = req.user;
		return await this.userService.getUserById(user.id);
	}

  @Post()
  async createUser(
    @Body(ValidationPipe) userDto: CreateUserDto
  ): Promise<UserResponseDto> {
  	return await this.userService.create(userDto);
  }

  @Put()
  @UseGuards(AuthGuard())
  async updateUser(
    @Body(new ValidationPipe({ transform: true })) userDto: UpdateUserDto,
    @Req() req: any
  ): Promise<UserResponseDto> {
  	const user: UserResponseDto = req.user;
  	return await this.userService.update(user.id, userDto);
  }
}
