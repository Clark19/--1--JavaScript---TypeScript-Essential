import { NewsFeed, NewsStore } from './types';

export class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }
  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeeds(): boolean {
    return this.feeds.length > 0; 
  }

  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]): void {
    // forEach() 대신 map() 써보기
    this.feeds = feeds.map(feed => ({
      ...feed,
      read: false
    }));
  }

  // 읽은 글 표시하기 위한 프로퍼티(read) 추가. 값을 true로 할당
  makeRead(id: number): void {
    const found = this.feeds.find((feed: NewsFeed) => feed.id === id);
    if (found)
      found.read = true;
  }
}