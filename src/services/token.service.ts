import jwt from 'jsonwebtoken';
import { TOKEN_TYPE } from '../constants';
import Token from '../entities/token.entity';
import BadRequestError from '../errors/BadRequestError';
import UnauthorizedError from '../errors/UnauthorizedError';
import { TokenResponse } from '../interfaces/auth';
import User from '../entities/user.entity';

class TokenService {
  async generateToken(tokenType: string, id: string): Promise<string> {
    let token = '';
    if (tokenType === TOKEN_TYPE.ACCESS) {
      const jwtKey = process.env.JWT_KEY!;
      const duration = process.env.JWT_TOKEN_EXPIRES_IN!;
      token = this.generateJwtToken(id, jwtKey, duration);
    }
    if (tokenType === TOKEN_TYPE.REFRESH) {
      const jwtRefreshKey = process.env.JWT_REFRESH_KEY!;
      const duration = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!;
      token = this.generateJwtToken(id, jwtRefreshKey, duration);
      await this.saveToken(id, token);
    }
    return token;
  }

  async saveToken(userId: string, jwtPayload: string): Promise<void> {
    const token = new Token();
    token.user = userId;
    token.payload = jwtPayload;
    await token.save();
  }

  generateJwtToken(id: string, jwtKey: string, duration: string): string {
    return jwt.sign({ id }, jwtKey, { expiresIn: duration });
  }

  async validateRefreshToken(payload: string): Promise<TokenResponse> {
    await this.verifyRefreshToken(payload);
    const token = await this.findAndDeleteToken(payload);
    const newRefreshPayload = await this.generateToken(
      TOKEN_TYPE.REFRESH,
      token.user,
    );
    const newAccessPayload = await this.generateToken(
      TOKEN_TYPE.ACCESS,
      token.user,
    );
    return {
      accessToken: newAccessPayload,
      refreshToken: newRefreshPayload,
    };
  }

  async verifyRefreshToken(payload: string): Promise<void> {
    try {
      const jwtRefreshTokenKey = process.env.JWT_REFRESH_KEY!;
      await jwt.verify(payload, jwtRefreshTokenKey);
    } catch (err) {
      await this.findAndDeleteToken(payload);
      throw new UnauthorizedError('Unauthorized Request!');
    }
  }

  async findAndDeleteToken(payload: string): Promise<Token> {
    const token = await Token.findOne({
      where: { payload },
    });
    if (!token) {
      throw new BadRequestError('Token is invalid or expired!');
    }
    await Token.delete(token._id);
    return token;
  }

  async findAllTokensByUserId(userId: string): Promise<Token[]> {
    const user = await User.findOne({
      where: { _id: userId },
      relations: ['tokens'],
    });
    const tokens = user!.tokens;
    return tokens;
  }
}
const tokenService = new TokenService();
export default tokenService;
