import { Method } from "axios";
import request from "../config/axios";
import { UserState } from "../store/useUserModel";
import { Utils } from "../utils/func";

// interface PlainObject {}

export interface UserLoginData {
  account: string; //手机号或者邮箱
  password: string;
}

export const isMockEnv = () => process.env.NODE_ENV !== "production";

export const setRequestMethod = (method: Method): Method => {
  if (isMockEnv()) {
    return "GET";
  }
  return method;
};

export async function apiUserLogin(data: UserLoginData) {
  await Utils.Sleep(500);
  return request<UserState>({
    method: setRequestMethod("POST"),
    url: "/user/login",
    data: data,
  });
}
