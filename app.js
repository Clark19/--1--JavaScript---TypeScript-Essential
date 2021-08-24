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
const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul');

// 글 내용 구성 부분 - hashchange 핸들러
window.addEventListener('hashchange', function() {
  /* a.addEventListener('click', function()) 방식은 li 마다 클릭 이벤트 
   리스너 생성 시키는 문제 등이 발생하므로 hashchange 핸들러 방식으로 구현 함 */
  // console.log('해시가 변경됨');
  const id = location.hash.substr(1);
  const newsContent = getData(CONTENT_URL.replace('@id', id));

  const title = document.createElement('h1')
  container.innerHTML = `
    <h1>${newsContent.title}</h>

    <div>
      <a href="# ">목록으로</a>
    </div>
  `;
});

// 글 목록 구성 부분
const newsList = [];
newsList.push('<ul>');
for(let i=0; i<10; i++) {
  const div = document.createElement('div');
  newsList.push( `
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>
  `);
}
newsList.push('</ul>');

container.innerHTML = newsList.join('');

function getData(url) {
  ajax.open('GET', url, false); // 동기 방식: 학습용
  ajax.send();
  
  // 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
  // newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것
  return JSON.parse(ajax.response)
}