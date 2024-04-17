import {
  UserRegistrationData,
  UserRegistrationResponse,
} from '../interfaces/auth';
import User from '../entities/user.entity';
import UnauthorizedError from '../errors/UnauthorizedError';
import NotFoundError from '../errors/NotFoundError';

class UserService {
  async createUser(
    data: UserRegistrationData,
  ): Promise<UserRegistrationResponse> {
    const user = this.generateUser(data);
    return user.save();
  }

  async authenticateUserById(id: string): Promise<User> {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedError('Invalid credentials!');
    }
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return User.findOne({ where: { id } });
  }

  generateUser(userData: UserRegistrationData): User {
    const user = new User();
    user.id = userData.id;
    user.password = userData.password;
    return user;
  }

  async getUserInfo(userId: string): Promise<string> {
    const user = await User.findOne({ where: { _id: userId } });
    if (!user) {
      throw new NotFoundError('User info does not exist!');
    }
    return user.id;
  }
}

const userService = new UserService();
export default userService;
