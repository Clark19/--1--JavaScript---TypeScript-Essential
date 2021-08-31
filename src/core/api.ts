import { NewsFeed, NewsDetail } from '../types';

export class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
    // ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open('GET', this.url, false); // 동기 방식: 학습용
    this.ajax.send()

  /* 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
  newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것 */
    return JSON.parse(this.ajax.response)
  }
}

export class NewsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequest<NewsFeed[]>();
  }
}
export class NewsDetailApi extends Api {
  getData(): NewsDetail {
    return this.getRequest<NewsDetail>();
  }
}