import { Request } from 'express';

export interface UserRegistrationData {
  id: string;
  password: string;
  confirmPassword: string;
}

export interface UserRegistrationResponse {
  id: string;
}

export interface UserLoginData {
  id: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RequestWithUser extends Request {
  user: {
    id: string;
  };
}
