import { AuthUserDTO } from './AuthUserDTO';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  user: AuthUserDTO;
}