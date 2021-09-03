import { NewsFeed, NewsDetail } from '../types';

export class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
    // ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
  }

  protected getRequest<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.ajax.open('GET', this.url);
    this.ajax.addEventListener('load', () => {
      /* 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
      newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것 */
      cb(JSON.parse(this.ajax.response) as AjaxResponse);
    });
    this.ajax.send();
  }
}

export class NewsFeedApi extends Api {
  getData(cb: (data: NewsFeed[]) => void): void {
    return this.getRequest<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  getData(cb: (data: NewsDetail) => void): void {
    return this.getRequest<NewsDetail>(cb);
  }
}