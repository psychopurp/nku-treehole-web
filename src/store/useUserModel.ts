import { useState } from "react";
import { getToken, setToken, removeToken } from "../utils/cookie";
import LocalStore from "../utils/store";
import { createModel } from "hox";

export interface User {
  id: string;
  name: string;
  sex: string;
  birthday?: string | null;
  avatar: string | null;
  phone?: string;
  level: number;
}

export interface UserState extends User {
  token: string;
}

const USER_KEY = "NKU-Treehole-User";

const localUser = LocalStore.getValue<UserState>(USER_KEY) || {};

const defaultUser: UserState = {
  id: "0",
  name: "cactus",
  sex: "男",
  birthday: null,
  avatar: "",
  level: 0,
  token: getToken(),
  ...localUser,
};

function useUser() {
  const [userInfo, setUserInfo] = useState<UserState>({
    ...defaultUser,
  });

  const login = (newUserInfo: UserState) => {
    setToken(newUserInfo.token);
    LocalStore.setValue(USER_KEY, newUserInfo);
    setUserInfo(newUserInfo);
  };

  const logout = () => {
    removeToken();
    LocalStore.removeValue(USER_KEY);
    setUserInfo({ ...defaultUser });
  };

  return {
    userInfo,
    login,
    logout,
  };
}

export default createModel(useUser);
