/*
hacker news api 사용(사용 신청도 필요 없어 간단)
- 해커 뉴스 사이트: https://hnpwa.com/
- API 문서: https://github.com/tastejs/hacker-news-pwas/blob/master/docs/api.md
*/
const container = document.getElementById('root');
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json';

// ajax 부분 : XMLHttpRequest. 학습 위해 fetch()와 비동기 사용 안함.
const ajax = new XMLHttpRequest();

const store = {
  currentPage: 1,
};



// 글 내용 구성 & 출력 - hashchange 핸들러
window.addEventListener('hashchange', router);
router();


function getData(url) {
  ajax.open('GET', url, false); // 동기 방식: 학습용
  ajax.send();
  
  // 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
  // newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것
  return JSON.parse(ajax.response)
}

// 글 목록 구성 부분
function newsFeed() {
  const newsFeed = getData(NEWS_URL);
  // !! 문자열 구성시 자주 사용하는 테크닉 중 하나: 배열에 무자열 쌓아놓고 나중에 join('')으로 합쳐서 리턴
  const newsList = [];
  
  let template = `
    <div>
      <h1>Hacker News</h1>
      <ul>
          {{__news_feed__}}
      </ul>
      <div>
        <a href="#/page/{{__prev_page__}}">이전 페이지</a>
        <a href="#/page/{{__next_page__}}">다음 페이지</a>
      </div>
    </div>
  `;

  for(let i = (store.currentPage-1)*10; i < store.currentPage*10; i++) {
    newsList.push( `
      <li>
        <a href="#/show/${newsFeed[i].id}">
          ${newsFeed[i].title} (${newsFeed[i].comments_count})
        </a>
      </li>
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage -1 : 1 );
  template = template.replace('{{__next_page__}}', store.currentPage + 1 );

  container.innerHTML = template;
}

// 글 내용 구성 & 출력
function newsDetail() {
  const id = location.hash.substr(7); // # 짤라내고 hash 값 가져오기
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  const title = document.createElement('h1');
  container.innerHTML = `
    <h1>${newsContent.title}</h>

    <div>
      <a href="#/page/${store.currentPage}">목록으로</a>
    </div>
  `;
}

function router() {
  const routePath = location.hash; // hash에 #만 들어있으면 빈문자열 반환

  if (routePath === '') {
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0) {
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }
}


console.log(xx)

xx=80
let xx;

console.log(xx)