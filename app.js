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
ajax.open('GET', NEWS_URL, false); // 동기 방식: 학습용
ajax.send();
// console.log(ajax.response); // 잘 되는지 확인

// 문자열 파싱 부분: 내장 객체 사용해 문자열 배열 형태로 변경
// newsFeed에 무슨 프로퍼티 있는지는 위 API 문서 링크 참고할 것
const newsFeed = JSON.parse(ajax.response)
// console.log(newsFeed)
const ul = document.createElement('ul');

window.addEventListener('hashchange', function() {
  // console.log('해시가 변경됨');
  const id = location.hash.substr(1);

  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1')
  title.innerHTML = newsContent.title;
  content.appendChild(title);
  console.log(newsContent)
});

for(let i=0; i<10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  /* a.addEventListener('click', function()) 방식은 li 마다 클릭 이벤트 
   리스너 생성 시키는 문제 등이 발생하므로 hashchange 핸들러 방식으로 구현 함 */
  li.appendChild(a)
  ul.appendChild(li);
}

container.appendChild(ul)
container.appendChild(content)