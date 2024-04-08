import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
import { environment } from '@env/environment';

export class CustomReuseStrategy implements RouteReuseStrategy {
  private routeHandles: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // console.log(1);
    return environment.enablePageTabView; // 始终允许路由离开并保存其处理
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // console.log(1);
    // 存储路由处理，使用路由路径作为唯一标识符
    const path = this.getRoutePath(route);
    if (path) {
      this.routeHandles[path] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // console.log(1);
    // 只有在标签页第一次打开时才附加路由处理
    const path = this.getRoutePath(route);
    return !!path && !!this.routeHandles[path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // console.log(1);
    // 从存储中检索路由处理
    const path = this.getRoutePath(route);
    return path ? this.routeHandles[path] : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log(1);
    // 只有在不同的标签页之间才复用路由
    return future.routeConfig === curr.routeConfig && future.params.tabId !== curr.params.tabId;
  }

  private getRoutePath(route: ActivatedRouteSnapshot): string | null {
    // console.log(1);
    // 获取路由路径，如果路由配置为 null 或 undefined，则返回 null
    return route.routeConfig?.path || null;
  }
}
