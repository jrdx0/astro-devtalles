import { registerUser } from "./auth";
import {logout} from "./auth/logout.action";
import { login } from './auth/login.action';
import {loginWithGoogle} from "./auth/login-google.action";

export const server = {
  registerUser,
  logout,
  login,
  loginWithGoogle
};
