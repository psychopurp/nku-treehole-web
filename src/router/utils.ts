import routes, { IRoute } from "./router";

/**
 *
 * 将路由转换为一维数组
 * @param routes 路由
 * @param deep 是否深层转化
 * @param auth 路由是否需要检查授权, 路由配置的auth优先级比这里高
 */
export function flattenRoute(
  routes: IRoute[],
  deep: boolean,
  auth: boolean
): IRoute[] {
  const result: IRoute[] = [];

  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];

    let exact =
      typeof route.exact !== "undefined"
        ? route.exact
        : typeof route.children !== "undefined"
        ? false // 有子节点需要设置为 exact=false
        : true;

    result.push({
      ...route,
      auth: typeof route.auth !== "undefined" ? route.auth : auth,
      exact: exact,
    });

    if (route.children && deep) {
      result.push(...flattenRoute(route.children, deep, auth));
    }
  }
  return result;
}

function getLayoutRoutes(): IRoute[] {
  let r = flattenRoute(routes, false, false);
  return r;
}

function getSystemRoutes(): IRoute[] {
  const tmpRoutes = routes.filter((route) => route.path === "/system");
  if (tmpRoutes.length > 0) {
    let r = flattenRoute(tmpRoutes, true, false);

    return r;
  }
  return [];
}

function getBusinessRoutes(): IRoute[] {
  const tmpRoutes = routes.filter((route) => route.path === "/");
  if (tmpRoutes.length > 0) {
    let r = flattenRoute(tmpRoutes, true, true);
    return r;
  }
  return [];
}

/**
 * 这里会将 config 中所有路由解析成三个数组
 * 第一个: 最外层的路由，例如  Layout UserLayout ...
 * 第二个: 系统路由, 例如 Login Register RegisterResult
 * 第三个: 业务路由，为 / 路由下的业务路由
 */

export const layoutRoutes = getLayoutRoutes();

export const systemRoutes = getSystemRoutes();

export const businessRoutes = getBusinessRoutes();
