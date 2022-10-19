import { CreateUserDto, UpdateUserDto, UserResponseDto } from "../dto/user.dto";
import { userExampleValues } from "../utils/user.constants";
import { User } from "../entities/user.entity";

export class UserMock {
  static mockUser(): User {
    const user = new User();

    user.id = userExampleValues.id;

    user.email = userExampleValues.email;
    user.username = userExampleValues.username;
    user.password = userExampleValues.encryptedPassword;

    return user;
  }

  static mockUserDto(): UserResponseDto {
    const userDto = new UserResponseDto();

    userDto.id = userExampleValues.id;

    userDto.email = userExampleValues.email;
    userDto.username = userExampleValues.username;
    userDto.password = userExampleValues.encryptedPassword;

    userDto.createdAt = new Date(userExampleValues.createdAt);
    userDto.updatedAt = new Date(userExampleValues.updatedAt);

    return userDto;
  }

  static mockUserUpdateDto(): UpdateUserDto {
    const userUpdateDto = new UpdateUserDto();

    userUpdateDto.id = userExampleValues.id;
    userUpdateDto.username = userExampleValues.username;
    userUpdateDto.email = userExampleValues.email;

    userUpdateDto.oldpassword = userExampleValues.password;
    userUpdateDto.password = userExampleValues.password;

    return userUpdateDto;
  }

  static mockPassword(): string {
    return userExampleValues.password;
  }

  static mockEncryptedPassword(): string {
    return userExampleValues.encryptedPassword;
  }
}
