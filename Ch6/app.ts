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