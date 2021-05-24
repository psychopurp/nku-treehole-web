import React from "react";
import { Route, Switch } from "react-router-dom";

export interface IRouteBase {
  // 路由路径
  path: string;
  // 路由组件
  component?: any;
  // 302 跳转
  redirect?: string;
  // 路由信息
  meta?: IRouteMeta;
  // 是否校验权限, false 为不校验, 不存在该属性或者为true 为校验, 子路由会继承父路由的 auth 属性
  auth?: boolean;
  exact?: boolean;
  strict?: boolean;
}

export interface IRouteMeta {
  title: string;
  icon?: string;
}
export interface IRoute extends IRouteBase {
  children?: IRoute[];
}

/**
 * routes 第一级路由负责最外层的路由渲染，比如 userLayout 和 Layout 的区分
 * 所有系统内部存在的页面路由都要在此地申明引入
 */

const routes: IRoute[] = [
  {
    path: "/system",
    component: React.lazy(() => import("../layout/SystemLayout")),
    redirect: "/system/login",
    children: [
      {
        path: "/system/login",
        component: React.lazy(() => import("../pages/Login")),
      },
      {
        path: "/system/register",
        component: React.lazy(() => import("../pages/Profile")),
      },
    ],
  },
  {
    path: "/welcome",
    component: React.lazy(() => import("../pages/Welcome")),
  },
  {
    path: "/",
    component: React.lazy(() => import("../layout/index")),
    redirect: "/index/home",
    children: [
      {
        path: "/index/home",
        component: React.lazy(() => import("../pages/Home")),
      },
      {
        path: "/index/profile",
        component: React.lazy(() => import("../pages/Register")),
      },
    ],
  },
];

export default routes;

export const renderRoutes = (routeList: IRoute[]) => {};
