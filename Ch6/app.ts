/* Context 강의 실습 코드 */
const person = {
  name: 'Kim min tae',
  age: 40,
  getAge() {
    return this.age;
  }
};

person.age;
console.log(person.getAge());



/* class 만들때 아예 this를 bind()함수 이용해 객체 생성당시의 this로 고정 시키는 방법의 예제
*/
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;

    // bind() 이용한 this를 고정하는 방법
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    return this.age;
  }

  // lexical(어휘적) 컨텍스트 예: arrow function 사용하면 언제나 객체 만들때 고정된다.
  // 화살표 함수의 this는 어휘적 컨텍스트에 의해 getName 속성(메서드?)가 생성될때의 this로 고정됨.
  // arrow function, call/apply/bind() 쓰면 this를 다른 것으로 바인드 할 수 없으므로 주의해야 함.
  getName = () => this.name;
}

const p1 = new Person('Kim mintae', 30);
console.log(p1.getAge());


const myAge = p1.getAge;
// console.log(myAge.call(p1)); => 클래스


console.log(p1.getName());

const x= p1.getName;
console.log(x()); // p1.getName() 과 화살표 함수 때문에 동일한 결과가 됨. 




// Class Practice 2021.09.15
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");

// Class Inheritance
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}
class Dog extends Animal {
  bark() {
    console.log('Woof! Woof!');
  }
}
const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();


// Ch06_20강, 21강. 문법-튜플(TS), 클래스(Class) 실습
// 20강 튜플 (타입스크립트 전용)
// let arr = [1, '2', new Date()]
// console.log(arr)

const address: [number, string, string] = [14023, '서울시', '송파구'];
let [zipcode, address1] = address;
// 위에서 튜플의 첫번째 위치는 number 타입으로 규정했으므로 zicode 변수는 number 타입이 됨.
// zipcode = '12345'; 이런식으로 코딩하면 에러를 내준다



/* Ch.06_21강 < 타입스크립트 클래스 > TypeScript Class 2021.10.04 실습.
타입스크립트에서는 더 다양한 기능을 제공하고 있다. 객체의 상속과 조금 더 정교하고 간편한 속성 제어 등의 기능들을 활용할 수 있게 되었다.

TS의 클래스도 기본은 당연히 JS 프로토타입 메커니즘을 따른다.
*/
abstract class Shape { // 도형을 위한 추상 기본 클래스
  public static BORDER_WIDTH = 5;
  public readonly name: string = 'Shape';

  protected _borderWidth: number;
  private action!: string;
  private action2?: string; 

  constructor(borderWidth: number = 0) {
    this._borderWidth = borderWidth;
  }

  abstract area: () => number;

  set borderWidth(width: number) {
    // ...
    this._borderWidth = width;
    // ...
  }

  get borderWidth(): number {
    return this._borderWidth;
  }
}

class Circle extends Shape {
  private _radius: number;
  public name: string = 'Circle';

  constructor(radius: number) {
    super();
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  area = () => this._radius * this._radius * Math.PI;
}



class Foo {
  // 클래스 프로퍼티를 사전 선언하여야 한다
  private name: string;
  public x: string;
  protected y: string;
  private z: string;

  constructor(name: string, x: string, y: string, z: string) {
    // public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
    this.name = name;
    this.x = x;
    this.y = y;
    this.z = z;
  }

  walk() {
    console.log(`${this.name} is walking.`);
  }
}

const foo = new Foo('myName');
foo.walk(); // myName is walking



class Foo {
  /*
  접근 제한자가 선언된 생성자 파라미터 x는 클래스 프로퍼티로 선언되고 지동으로 초기화된다.
  public이 선언되었으므로 x는 클래스 외부에서도 참조가 가능하다.
  */
  constructor(public x: string) { }
}

class Bar {
  /*
  접근 제한자가 선언된 생성자 파라미터 x는 멤버 변수로 선언되고 자동으로 초기화된다.
  private이 선언되었으므로 x는 클래스 내부에서만 참조 가능하다.
  */
  constructor(private x: string) { }
}




// Class 상속 - https://www.typescriptlang.org/docs/handbook/2/classes.html#class-heritage
// implements 사용
interface A {
  x: number;
  y?: number;
}
class C implements A {
  x = 0;
}
const c = new C();
c.y = 10;
Property 'y' does not exist on type 'C'.

// extends 사용



class Animal {
  move() {
    console.log("Moving along!");
  }
}
 
class Dog extends Animal {
  woof(times: number) {
    for (let i = 0; i < times; i++) {
      console.log("woof!");
    }
  }
}
 
const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);
/* 그 밖에 readonly, static 등 많다.
readonly 구현 할 때 readonly 키워드 사용법도 있지만,
private property로 만들어 get 키워드로 gettter 만 제공해주는 방법도 존재한다.
이 방법은 vanilla JS에서는 #과 get 으로 이용하면 될 것 같다.
아무튼 TS에서 일반적으로 읽기 전용 속성으로 프로퍼티 만들땐 readonly 키워드를 사용하며 될 것 같다.
Interface는 공개된 규약을 지정해서 가이드라인을 할때 사용한다.
즉, 여러 개발자가 어떤 공통 기반의 클래스를 다뤄야 할때, 문서에다가 설명하기 보단
코드 구현상으로 가이드 라인을 제시하는 용도로 사용한다.
그리고 interface는 private, protected 프러퍼티는 지원하지 않는다.
인터페이스의 컨셉상 맞지 않기 때문에 지원하지 않는다.

그리고 추가로 타입스크립트에서 프로퍼티명 뒤의 !(느낌표)는 값을 세팅하지 않아도 된다는 뜻의 기호이다.
아래 코드를 참조 바람
private action!: string; 

또한 프로퍼티명 뒤의 ?(물음표)는 옵셔널이란 용어로 사용되는데
이 속성 자체가 없어도 된다는 뜻이다. 값을 세팅하지 않아도 되는거 하고는 다르다.
private action?: string; 
*/