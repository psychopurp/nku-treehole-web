import request from "../config/axios";
import { UserState } from "../store/useUserModel";

// interface PlainObject {}

export interface UserLoginData {
  account: string; //手机号或者邮箱
  password: string;
}

export function apiUserLogin(data: UserLoginData) {
  return request<UserState>({
    method: "GET",
    url: "/user/login",
    data: data,
  });
}
