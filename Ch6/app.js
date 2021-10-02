console.log('hello Debugger 1');

// debugger 키워드: 브레이크 포인트 안걸어도 디버깅이 걸려서 여기서 멈춘다
debugger;

console.log('hello Debugger 2');


// 'Ch06_48. 도구-Babe' 강의 실습
function double(x) {
    return x * 2;
  }
  
  const doubleV2 = x => x*2;
  
  class Double {
    x;
    constructor(x) {
      this.x = x;
    }
    getValue() {
      return this.x *2;
    }
  }
  
  const d = new Double(10);
  d.getValue();


  // ch6_01 식별자
  let age = 10;
  const AGE = 10;

  function setAge() {

  }

  const o = {
    age: 10,
    ['myName']: '김'
  }
  o.myName




// Ch06_17. 문법-객체-프로그래밍 도구로서의 객체 2021.10.01 실습
function calculateCircleArea(radius) {
  return radius * radius * Math.PI;
}

function calculateRectArea(width, height) {
  return width * height;
}

class Circle {
  #radius;

  constructor(radius) {
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  area = () => this.#radius * this.#radius * Math.PI;
}

class Rect {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }
}

const circle = new Circle(50);
const rect = new Rect(150, 200);

// 안좋은 예
console.log(calculateCircleArea(circle.radius));
console.log(calculateRectArea(rect.width, rect.height));

// 위보다 좋은 예
console.log(circlee.area());
console.log(rect.area());



/* < JS의 배열(array)과 Python 리스트(list) 의 특징과 중요 연산자 정리, 실습 >
자바스크립트 배열은 한가지 타입의 여러 데이터를 저장할 수 있는 데이터 타입이다.

삽입되어 있는 데이터들엔 이름이 없고 인덱스로 접근할 수 있다.



이번 강의에선 배열의 기본 특성과 연산에 대해서 살펴봤다.

이번 글에선 배열의 간단한 기본적 특성과 기본 연산자 위주로 정리해보려 한다.

특히 파이썬의 리스트(자바스크립트의 배열에 해당)와 비교하여 정리하려 한다.

파이썬과 자바스크립트 둘다 왔다갔다 하면서 사용중인데 하나만 사용하면 덜 헷갈릴텐데

, 둘을 번갈아 사용하니 엄청 헷갈린다.



< JS의 배열(array)과 Python 리스트(list) 의 특징 >
* 배열/리스트 안의 데이터에 대한 접근이 빠르다. 인덱스 번호로만 접근하면 한방에 접근 가능하기 때문이다.
* 데이터가 많을때 삭제/삽입은 상대적으로 느리다. 메모리(힙?)에 순차적으로 인접해 있는 상태이기 때문에 삽입/삭제시, 삽입/삭제 위치 이후로 데이터들을 싹다 이동 시켜야 한다. 최악의 경우 배열을 아예 재생성 복사해야 한다. (언어에 따라서 배열을 추가로 만들어서 꼬리에 링크드 리스트 비슷하게 붙이는 형식으로 언어에 따라 구현형태가 달리지기도 한다)


< Python List VS. JavaScript Array 중요/자주사용하는 연산자 1 >
(P) list vs (JS) array   -  파이썬 list 와 유사한 데이터 타입이 JS에선 array
(P) myList = [1, 2, 3, 4, 5, 6]     , 리스트 길이: len(myList)
(JS) 배열: let arr = [1, 2, 3, 4, 5, 6];    배열 길이: arr.length;

뒤/앞에 데이터 추가 : (P)append(d)/insert(i,d)  vs (JS)push(d)/unshift(d)
(P 뒤 추가) append(), insert(idx, data) -  (예) myList.append() or myList.insert(len(myList), 7)
(P 앞 추가) insert(idx, data) -  myList.insert(0, 7)
(JS 뒤 추가) push(data)  - arr.push(7);
(JS 앞 추가) unshift(data) - arr.unshift(7);
뒤/앞의 데이터 빼내기(삭제 & 리턴) : (P)pop()/pop(i) vs (JS)pop()/shift()
(P 그냥 삭제) list.remove(data) : 인덱스 0부터 조회하여 처음 나오는 자료 data를 제거
(P 뒤 빼기) pop()  -   lastData = myList.pop()
(P 앞 빼기) pop(idx)  -  firstData = myList.pop(0)
(JS 뒤 빼기) pop() - const lastData = arr.pop() // 원본 데이터 수정
(JS 앞 빼기) shift() - const lastData = arr.shift()
(JS 복사 빼기) slice(sIdx, eIdx) - const datas = arr.slice(1,2) // 원본 데이터 유지
데이터 하나만 복사 빼옴. 즉, eIdx 이전까지 복사. 원본 데이터 유지
(JS 빼기 & 추가) splice(sIdx, eIdx) - const datas = arr.splice(1,2, 'data1', 'data2', 'data3')
데이터 두개 복사 빼옴. 즉, eIdx 포함해서 복사
datas : arr[1], arr[2] 데이터가 들어가 있음.
arr 엔 원래 있던 arr[1], arr[2] 없어지고, 대신 'data1', 'data2', 'data3' 가 대체되어 있음
*/
// JS 코드
let fruit = ['Apple', 'Banana', 'Tomato']
document.write(fruit.length)
fruit.push('A')
fruit.unshift('B')
document.write(fruit)
fruit.pop()
fruit.shift()
document.write(fruit)

/*
Join(), split()
(P) str.split() - string을 리스트 합성하여 리턴,
(P) str.join(list) -> 리스트를 str 삽입하여 문자열로 변환
(JS) str.split(' ') - 공백" "을 기준으로 문자열을 나눈 후 배열 리턴
JS string 에서 join()은 없음, 대신 Array에 있음
(JS) arr.join() => string으로 만들어줌
Python 리스트 합치기는 ?
JS 배열 합치기
arr3 = arr.concat(arr2) : 매뉴얼 봐야되서 직관성 떨어짐
전개 연산자 이용법(직관적?) : arr3 = [...arr, arr2] // 가독성 더 좋고, 표현력이 더 좋음.
논리 연산자 : (P) and/or/not   VS.   (JS) &&/||/!
*/
// JS
const arr = ['Fire', 'Air', 'Water'];
console.log(arr.join()); // "Fire,Air,Water" == arr.join(',')
console.log(arr.join('')); // "FireAirWater"

