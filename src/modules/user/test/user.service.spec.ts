import { NotFoundException, BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { I18nJsonParser, I18nModule } from "nestjs-i18n";
import * as path from "path";
import { UserRepository } from "../user.repository";
import { UserService } from "../user.service";
import { UserMock } from "./user.mock";
import { User } from "../entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

describe("User Service", () => {
  let userRepository: UserRepository;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        I18nModule.forRoot({
          fallbackLanguage: "en",
          parser: I18nJsonParser,
          parserOptions: {
            path: path.join(__dirname + "../../../../translations"),
          },
        }),
        JwtModule.register({
          secret: process.env.SECRET_ACCESS_TOKEN,
          signOptions: {
            expiresIn: Number(process.env.SECRET_TIME_ACCESS_TOKEN),
          },
        }),
      ],
      providers: [UserRepository, UserService],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userService = module.get<UserService>(UserService);
  });

  describe("getUserById", () => {
    it("should get a user by its id", async () => {
      const { id } = UserMock.mockUserDto();
      const user = UserMock.mockUser();

      const getUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => getUserPromise);

      const result = await userService.getUserById(id);

      expect(result).toStrictEqual(user);
    });
  });

  describe("findOneByEmail", () => {
    it("should get a user by its email", async () => {
      const email = UserMock.mockUser().email;
      const user = UserMock.mockUser();

      const getUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userService, "findOneByEmail")
        .mockImplementation(() => getUserPromise);

      const result = await userService.findOneByEmail(email);

      expect(result).toStrictEqual(user);
    });
  });

  describe("find By Username", () => {
    it("should get a list of users by query", async () => {
      const query = UserMock.mockUser().username;
      const response = UserMock.mockUser();

      const users = UserMock.mockUser();

      const getUsersPromise = new Promise<any>((resolve) => {
        resolve(users);
      });

      jest
        .spyOn(userService, "findByPayload")
        .mockImplementation(() => getUsersPromise);

      const result = await userService.findByPayload({ username: query });

      expect(result).toStrictEqual(response);
    });
  });

  describe("create", () => {
    it("should create a user", async () => {
      const body = UserMock.mockUser();
      const response = UserMock.mockUserDto();

      const getUsersPromise = new Promise<any>((resolve) => {
        resolve(response);
      });

      jest
        .spyOn(userService, "create")
        .mockImplementation(() => getUsersPromise);

      const result = await userService.create(body);

      expect(result).toStrictEqual(response);
    });
  });

  describe("update", () => {
    it("should update a user by its id", async () => {
      const { id } = UserMock.mockUserDto();
      const body = UserMock.mockUserUpdateDto();
      const response = UserMock.mockUserUpdateDto();

      const user = UserMock.mockUser();

      const getUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      const updateUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => getUserPromise);

      jest
        .spyOn(userService, "update")
        .mockImplementation(() => updateUserPromise);

      const result = await userService.update(id, body);

      expect(result).toEqual(user);
    });
  });
});
