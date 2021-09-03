import { NewsFeed, NewsDetail } from '../types';

export class Api {
  url: string;
  xhr: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.xhr = new XMLHttpRequest();
    // ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
  }

  protected async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    /* response.json() 는 비동기적으로 json을 객체화 하고 Promise 객체를 리턴 한다(비동기 함수므로(asyn 함수?)).
    JSON.parse(xhr.response)는 동기화 함수다. json이 크면 객체화 하느라 다음 코드를 실행하지 않음 */
    return await response.json() as AjaxResponse;
  }

}

export class NewsFeedApi extends Api {
  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  async getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}