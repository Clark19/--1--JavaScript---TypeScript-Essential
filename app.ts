/*
hacker news api 사용(사용 신청도 필요 없어 간단)
- 해커 뉴스 사이트: https://hnpwa.com/
- API 문서: https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
*/

// 타입 생성: interface 이용. 기존 type alias, &(intersection, 상속 유사), |(pipeline, or 유사) 이용.
interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}
interface NewsFeed extends News {
  readonly comments_count: number;
  readonly points: number;
  read?: boolean;
}

interface NewsDetail extends News {
  readonly comments: NewsComment[];
}

interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}

interface RouteInfo {
  path: string;
  page: View;
}


const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

// ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
const ajax: XMLHttpRequest = new XMLHttpRequest();

const store: Store = {
  currentPage: 1,
  feeds: []
};

class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false); // 동기 방식: 학습용
    this.ajax.send()

  /* 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
  newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것 */
    return JSON.parse(this.ajax.response)
  }
}

class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}
class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}


abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  // !! 문자열 구성시 자주 사용하는 테크닉 중 하나: 배열에 무자열 쌓아놓고 나중에 join('')으로 합쳐서 리턴
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);
    if (!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
    }

    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
      this.container.innerHTML = this.renderTemplate;
      this.renderTemplate = this.template;
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void;
}

class Router {
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

// 글 목록 구성 부분
class NewsFeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];

  constructor(containerId: string) {
    let template = `
      <div class="bg-gray-600 min-h-screen">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__prev_page__}}" class="text-gray-500">
                  Previous
                </a>
                <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
                  Next
                </a>
              </div>
            </div> 
          </div>
        </div>
        <div class="p-4 text-2xl text-gray-700">
          {{__news_feed__}}        
        </div>
      </div>
    `;

    super(containerId, template);
    
    this.api = new NewsFeedApi(NEWS_URL);
  
  // if(this.feeds.length ===0)  ??
  if (store.feeds.length === 0)
    this.feeds = store.feeds = this.api.getData();
  else
    this.feeds = store.feeds;
  this.makeFeeds();
  }

  render(): void {
    store.currentPage = Number(location.hash.substr(7) || 1);
    for(let i = (store.currentPage-1)*10; i < store.currentPage*10; i++) {
      const { id, title, comments_count, user, points, time_ago, read } = this.feeds[i];
      this.addHtml( `
        <div class="p-6 ${read ? 'bg-gray-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
          <div class="flex">
            <div class="flex-auto">
              <a href="#/show/${id}">${title}</a>  
            </div>
            <div class="text-center text-sm">
              <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
            </div>
          </div>
          <div class="flex mt-3">
            <div class="grid grid-cols-3 text-sm text-gray-500">
              <div><i class="fas fa-user mr-1"></i>${user}</div>
              <div><i class="fas fa-heart mr-1"></i>${points}</div>
              <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
            </div>  
          </div>
        </div>
      `);
    }
  
    this.setTemplateData('news_feed', this.getHtml());
    this.setTemplateData('prev_page', String(store.currentPage > 1 ? store.currentPage -1 : 1) );
    this.setTemplateData('next_page', String(store.currentPage + 1) );
  
    this.updateView()
  }

  // 읽은 글 표시하기 위한 프로퍼티 추가
  private makeFeeds() {
    this.feeds.forEach(feed => feed.read = false);
}

}


// 글 내용 구성 & 출력
class NewsDetailView extends View {
  constructor(containId: string) {
    let template: string = `
      <div class="bg-gray-600 min-h-screen pb-8">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <h1 class="font-extrabold">Hacker News</h1>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/{{__currentPage__}}" class="text-gray-500">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="h-full border rounded-xl bg-white m-6 p-4 ">
          <h2>{{__title__}}</h2>
          <div class="text-gray-400 h-20">
            {{__content__}}
          </div>

          {{__comments__}}

        </div>
      </div>
    `;

    super(containId, template);
  }

  render() {
    const id = location.hash.substr(7); // # 짤라내고 hash 값 가져오기
    const api = new NewsDetailApi(CONTENT_URL.replace('@id', id));
    const newsDetail: NewsDetail = api.getData();

    // 읽은 글 표시하기 위한 프로퍼티(read) 추가. 값을 true로 할당
    const found = store.feeds.find( obj => obj.id === Number(id) );
    if (found != undefined)
      found.read = true;

    this.setTemplateData('comments', this.makeComment(newsDetail.comments));
    this.setTemplateData('currentPage', String(store.currentPage));
    this.setTemplateData('title', newsDetail.title);
    this.setTemplateData('content', newsDetail.content);
    this.updateView();
  }

  makeComment(comments: NewsComment[]): string {
    for (let i = 0; i < comments.length; i++) {
      const comment: NewsComment = comments[i];
      this.addHtml(`
        <div style="padding-left: ${comment.level * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comment.user}</strong> ${comment.time_ago}
          </div>
          <p class="text-gray-700">${comment.content}</p>
        </div>
      `);
  
      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
  
    return this.getHtml();
  }

}


const router: Router = new Router();
const newsFeedView = new NewsFeedView('root');
const newsDetailView = new NewsDetailView('root');

router.setDefaultPage(newsFeedView);
router.addRoutePath('/page/', newsFeedView);
router.addRoutePath('/show/', newsDetailView);


router.route();