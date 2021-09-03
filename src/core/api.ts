import { NewsFeed, NewsDetail } from '../types';

export class Api {
  url: string;
  xhr: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.xhr = new XMLHttpRequest();
    // ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
  }

  protected getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.xhr.open('GET', this.url);
    this.xhr.addEventListener('load', () => {
      /* 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
      newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것 */
      cb(JSON.parse(this.xhr.response) as AjaxResponse);
    });
    this.xhr.send();
  }

  protected getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then(response => response.json()) /* 비동기적으로 json() 객체화 함. JSON.parse(xhr.response)는 동기화 함수다. json이 크면 객체화 하느라 다음 코드를 실행하지 않음 */
      .then(cb)
      .catch(() => {
        console.error('데이터를 불러오지 못했습니다.');
      })
  }

}

export class NewsFeedApi extends Api {
  getDataWithXHr(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }
  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  getDataWithXHr(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }
  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}