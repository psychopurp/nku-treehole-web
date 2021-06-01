import { Method } from "axios";
import request from "../config/axios";
import { UserState } from "../store/useUserModel";
import { Utils } from "../utils/func";

// interface PlainObject {}

export interface UserLoginData {
  email: string; //邮箱
  password: string;
}

export interface UserRegisterData {
  email: string; // 邮箱
  password: string;
  username: string;
}

export const isMockEnv = () => false;

export const setRequestMethod = (method: Method): Method => {
  if (isMockEnv()) {
    return "GET";
  }
  return method;
};

export async function apiUserLogin(data: UserLoginData) {
  // await Utils.Sleep(500);
  return request<UserState>({
    method: setRequestMethod("POST"),
    url: "/user/login",
    data: data,
  });
}

export async function apiUserRegister(data: UserRegisterData) {
  // await Utils.Sleep(500);
  return request<UserState>({
    method: setRequestMethod("POST"),
    url: "/user/register",
    data: data,
  });
}
