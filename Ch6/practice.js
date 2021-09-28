// Ch06_03. 문법-식(연산 또는 계산) 실습
const colors = ['red', 'yellow', 'black'];
const Colors = {
    blue: 'blue',
    green: 'green',
    white: 'white',
}

// const red = colors[0];
// const yellow = colors[1];
// const black = colors[2];

// 구조 분해 할당자 연산
const {red, yellow, black} = colors;
const { green, white} = Colors;
dd


// 동등 비교 연산
let a = 10;
let b = '10';

if (a === b) {
}

// 삼항 연산자 활용
a = (a === b) ? 0 : 1;


/* 해당 인강에선 다음과 같이 말하였다.

자바스크립트에서 값이라고 명명한 것은 식이라 할 수 있다. 이 개념은 함수편에서 중요한 개념이다.

아래 함수 선언문은 말 그대로 문(statement)  이다.

function foo() { ... }

그런데 아래와 같은, 값이 아닌 함수 정의문을 소괄호() 로 감싸면 값이 될 수 있다고 한다. 세미콜론이 없어서 문(statement)이라고 하였다.

( function foo() {...} );

자바스크립트에서 함수든 뭐든 대부분 값이라고 하던데 소괄호로 감싸지 않으면 함수는 값이 아닌건지 좀 헷갈리게 되었다;

아래 처럼 작성하고 실행해도 별 이상 없이 잘 실행되는 걸로 보아 소괄호로 감싸지 않아도 함수는 값인거 같은데, 강사님의 말은 아마도 소괄호로 감싸면 값으로 활용할 수 있는 테크닉 같은 걸 강조한걸 아닐까 추측해 본다. */
let fun = function() {console.log( 1);};
let fun2 = function foo() {console.log(2);};


// Ch06_06. 문법-참조와 복사 실습
let a = 10;
let b = a;
b = 20;

let o = {
    isLoading: false,
}
let o2 = o;
// o2.isLoading = true;

function foo() {
    o.isLoading = true;
}
foo(o);
console.log(o.isLoading);

console.log('done');


// Ch06_07. 문법-조건(분기)문 강의 실습. 2021.09.22
let age = 40;
if (age === 10 || age > 30) {
} else if (!is) {
} else {
}

switch(age) {
    case 1:
      break;
    case 2:
        break;
    default:
      break;
}

// 아래와 같은 if 문의 경우 switch 문이 더 좋다
// if 문 안의 비교대상이 age로 같고, 범위 비교가 아니라  === 같은 동등 비교일 때
if (age === 1) {
} else if (age === 2) {
} else if (age === 3) {
} else { }



// Ch06_08. 문법-조건(분기)문 강의 실습. 2021.09.23
const arr = ['q', 'w', 'e', 'r'];

for (let i=0; i < arr.length; i++) {
    console.log(arr[i]);
}

let i = 0;
while (i < arr.length) {
    console.log(arr[i]);
    i++;
}

i=0;
do {
    console.log(arr[i]);
    i++;
} while(i < arr.length)


for (const item of arr) {
    console.log(item);
}

for (const idx in arr) {
    console.log(arr[idx]);
}

const obj = {
    hobby: 'soccer',
    name: 'John',
    age: 20,
};

for (const key in obj) {
    console.log(key);
}


// Ch06_13. 문법-일급 함수 (일급 객체) 실습 2021.09.27
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장살 수 있다.
// 런타임(할당 단계)예 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function(num) {
	return ++num;
}

const decrease = function(num) {
	return --num;
}

// 2. 함수는 객체에 저장할 수 있다.
const predicates = { increase, decrease }

// 3. 함수의 매개변수에 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
	let num = 0;

	return function() {
		num = predicate(num);
		return num;
	};
}

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
// 여기선 Closure를 이용하고 있다
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2

/* 함수는 객체이지만 일반 객체와는 차이가 있다. 일반 객체는 호출 할 수 없지만 함수 객체는 호출할 수 있다.
그리고 함수 객체는 일반 객체에는 없는 함수 고유의 프로퍼티를 소유한다.
square 함수의 모든 프로퍼티의 프롤퍼티 어트리뷰트를 아래 코드처럼 Object.getOwnPropertyDescriptors() 메서드로 확인할 수 있다. */
function square(number) {
    return number * number;
}

console.log(Object.getOwnPropertyDescriptors(square));