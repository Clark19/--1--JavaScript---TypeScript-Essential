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


