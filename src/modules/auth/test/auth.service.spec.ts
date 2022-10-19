import {
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { I18nJsonParser, I18nModule } from "nestjs-i18n";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import * as path from "path";
import { LoggerService } from "../../shared/logger/logger.service";
import { LoggerServiceMock } from "../../shared/logger/test/logger.mock";
import { AuthService } from "../auth.service";
import { AuthMock } from "./auth.mock";
import { UserRepository } from "../../user/user.repository";
import { UserService } from "../../user/user.service";
import { UserMock } from "../../user/test/user.mock";

describe("Auth Service", () => {
  let authService: AuthService;
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
      providers: [
        AuthService,
        UserRepository,
        UserService,
        {
          provide: LoggerService,
          useClass: LoggerServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe("signIn", () => {
    it("should authenticate a user by their credentials", async () => {
      const credentials = AuthMock.mockAuthCredentialsDto();
      const response = AuthMock.mockAuthResponseDto();

      const user = UserMock.mockUser();

      const getUserPromise = new Promise<any>((resolve) => {
        resolve(user);
      });

      const validPasswordPromise = new Promise<boolean>((resolve) => {
        resolve(true);
      });

      const authPromise = new Promise<any>((resolve) => {
        resolve(response);
      });

      jest
        .spyOn(userService, "findOneByEmail")
        .mockImplementation(() => getUserPromise);

      jest
        .spyOn(userService, "verifyPassword")
        .mockImplementation(() => validPasswordPromise);

      jest
        .spyOn(authService, "createAuth")
        .mockImplementation(() => authPromise);

      const result = await authService.signIn(credentials);

      expect(result).toStrictEqual(response);
    });

    it("should authenticate a user by their credentials, but no user was found", async () => {
      const credentials = AuthMock.mockAuthCredentialsDto();

      const getUserPromise = new Promise<any>((resolve) => {
        resolve(null);
      });

      jest
        .spyOn(userService, "findOneByEmail")
        .mockImplementation(() => getUserPromise);

      expect(async () => {
        await authService.signIn(credentials);
      }).rejects.toThrowError(UnauthorizedException);
    });

    it("should authenticate a user by their credentials, but the password is invalid", async () => {
      const credentials = AuthMock.mockAuthCredentialsDto();
      const user = UserMock.mockUser();

      const getUserPromise = new Promise<any>((resolve) => {
        resolve(user);
      });

      const validPasswordPromise = new Promise<boolean>((resolve) => {
        resolve(false);
      });

      jest
        .spyOn(userService, "findOneByEmail")
        .mockImplementation(() => getUserPromise);

      jest
        .spyOn(userService, "verifyPassword")
        .mockImplementation(() => validPasswordPromise);

      expect(async () => {
        await authService.signIn(credentials);
      }).rejects.toThrowError(UnauthorizedException);
    });
  });

  describe("createAuth", () => {
    it("should create an accessToken and refreshToken for user authentication", async () => {
      const user = UserMock.mockUser();
      const response = AuthMock.mockAuthResponseDto();

      const result = await authService.createAuth(user);

      Object.keys(response).forEach((property) => {
        expect(result).toHaveProperty(property);
      });
    });
  });

  describe("updateAuthToken", () => {
    it("should update an existing accessToken", async () => {
      const refreshToken = AuthMock.mockAuthRefreshTokenDto();
      const response = AuthMock.mockAuthRefreshTokenResponseDto();

      const user = UserMock.mockUser();
      const authCreationResponse = AuthMock.mockAuthResponseDto();

      const getUserPromise = new Promise<any>((resolve) => {
        resolve(user);
      });

      const authPromise = new Promise<any>((resolve) => {
        resolve(authCreationResponse);
      });

      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => getUserPromise);

      jest
        .spyOn(authService, "createAuth")
        .mockImplementation(() => authPromise);

      const result = await authService.updateAuthToken(refreshToken);

      Object.keys(response).forEach((property) => {
        expect(result).toHaveProperty(property);
      });
    });
    it("should FAILS for update an existing accessToken", async () => {
      const refreshToken = AuthMock.mockAuthRefreshTokenDto();
      const response = AuthMock.mockAuthRefreshTokenResponseDto();

      const user = UserMock.mockUser();
      const authCreationResponse = AuthMock.mockAuthResponseDto();

      const getUserPromise = new Promise<any>((resolve) => {
        resolve(user);
      });

      const authPromise = new Promise<any>((resolve) => {
        resolve({ authCreationResponse });
      });

      jest
        .spyOn(userService, "getUserById")
        .mockImplementation(() => getUserPromise);

      jest
        .spyOn(authService, "createAuth")
        .mockImplementation(() => authPromise);

      authService.updateAuthToken(null).catch((e) => {
        expect(e).toBeDefined();
      });
    });
  });

  describe("verifyToken", () => {
    it("should check the validity of the access token provided", async () => {
      const authToken = AuthMock.mockAuthTokenDto();

      const { isValid } = authService.verifyToken(authToken);

      expect(typeof isValid === "boolean").toBeTruthy();
    });
    it("should check the validity of the access token provided - FAIL", async () => {
      try {
        await authService.verifyToken(null);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
