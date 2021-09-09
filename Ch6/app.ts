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

  // lexical 컨텍스트 예: arrow function 사용하면 언제나 객체 만들때 고정된다 
  getName = () => this.name;
}

const p1 = new Person('Kim mintae', 30);
console.log(p1.getAge());


const myAge = p1.getAge;
// myAge.call(p1); => 클래스