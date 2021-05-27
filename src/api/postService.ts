import { Method } from "axios";
import request from "../config/axios";
import { UserState } from "../store/useUserModel";
import { Utils } from "../utils/func";
import { setRequestMethod } from "./userService";
import { PageQueryParams, QueryListResponseData } from "../types";

interface PlainObject {}

export interface CreatePostData {
  content: string;
}

export interface Post {
  postId: number;
  avatar: string;
  userName: string;
  userId: string;
  createAt: string;
  content: string;
}

export async function apiCreatePost(data: CreatePostData) {
  await Utils.Sleep(500);
  return request<PlainObject>({
    method: setRequestMethod("POST"),
    url: "/post/createPost",
    data: data,
  });
}

export async function apiGetPosts(data: PageQueryParams) {
  await Utils.Sleep(500);
  return request<QueryListResponseData<Post>>({
    method: setRequestMethod("GET"),
    url: "/post/getPosts",
    data: data,
  });
}
