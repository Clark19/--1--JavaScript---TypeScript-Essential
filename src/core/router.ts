import { RouteInfo } from '../types';
import View from './view';

export default class Router {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    // 글 내용 구성 & 출력 - hashchange 핸들러
    /* browser의 이벤트 시스템이 route 메서드를 호출하는게 되므로, 호출시 this context는 Router의 인스턴스가 아니게 됨.
      처음 라우터 객체 생성시 라우터의 this를 고정 시켜줘야 함. 등록 시점의 this context로 고정시켜 줘야 함. */
    window.addEventListener('hashchange', this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = { path: '', page}
  }
  addRoutePath(path: string, page: View): void {
    this.routeTable.push({ path, page });
  }

  route() {
    const routePath = location.hash; // hash에 #만 들어있으면 빈문자열 반환

    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}