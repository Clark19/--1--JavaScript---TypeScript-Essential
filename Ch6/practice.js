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