import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  UserRegistrationData,
  UserRegistrationResponse,
  UserLoginData,
  TokenResponse,
} from '../interfaces/auth';
import userService from './user.service';
import tokenService from './token.service';
import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { TOKEN_TYPE } from '../constants';

class AuthService {
  async signup(data: UserRegistrationData): Promise<UserRegistrationResponse> {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestError('Confirm password and password do not match!');
    }

    const existingUser = await userService.findUserById(data.id);
    if (existingUser) {
      throw new BadRequestError(
        'User with provided credentials already exists!',
      );
    }
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    data = { ...data, password: hashedPassword };

    const user = await userService.createUser(data);
    return user;
  }

  async login(data: UserLoginData): Promise<TokenResponse> {
    const user = await userService.authenticateUserById(data.id);
    if (!(await this.isPasswordMatching(data.password, user.password))) {
      throw new UnauthorizedError('Invalid username or password!');
    }

    return {
      accessToken: await tokenService.generateToken(
        TOKEN_TYPE.ACCESS,
        user._id,
      ),
      refreshToken: await tokenService.generateToken(
        TOKEN_TYPE.REFRESH,
        user._id,
      ),
    };
  }

  async logout(userId: string): Promise<void> {
    const tokens = await tokenService.findAllTokensByUserId(userId);
    await Promise.all(
      tokens.map(
        async (token) => await tokenService.findAndDeleteToken(token.payload),
      ),
    );
  }

  generateJwtToken(id: number): string {
    const jwtKey = process.env.JWT_KEY!;
    return jwt.sign({ id }, jwtKey, { expiresIn: '7d' });
  }

  async isPasswordMatching(
    enteredPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}

const authService = new AuthService();
export default authService;
