// Ch6_28 문법-@types (패키지 저장소) 강의 실습 2021.09.18
import { v4 } from 'uuid';

type UniqObject = {
    id: string;
    [key: string]: string | number | boolean;
}

const makeObject = (): UniqObject => ({
    id: v4(),
});

console.log(makeObject());
console.log(makeObject());


// Ch06_12 문법-속성과 메서드 실습 2021.09.26
type objType = {
	name: string; // name?: string;로 옵셔널(?) 선언하면 타입 정의 되있어도 동적 삭제 가능.
	age: number;
	getFamilyName: () => string;
	getLastName: () => string;
	getBloodType: () => string;
}
// obj 는 객체 리터럴로 객체(object)를 만들어 대입
const obj: objType = {
    name: 'Ha Nee',
    age: 20,
    getFamilyName: function() {
        return 'Lee';
    },
    
    getLastName: () => 'Lee',

    // 위 getFamilyName: 메서드와 같이 getBloodType()도 obj의 메서드이다. 표기법만 다름.
    getBloodType() {
        return 'B';
    },

}

obj.name;
obj.age;
obj.getFamilyName();
obj.getBloodType();
/* JS에선 동적으로 속성/메서드 추가 가능(아래처럼). 이 파일은 타입스크립트라서 안됨.
	obj.bloodType = 'A';
// 동적으로 속성도 삭제도 가능(아래처럼). obj에 bloodType이라는 속성/메서드가 없더라도
  아무 에러/예외가 안난다; js의 수많은 xx같은 점 중에 하나.(비일관성)
	delete obj.bloodType;
*/
// 타입스크립트에서 동적으로 속성/메서드 삭제 방지하려면 타입 정의 해주면됨

/* 자바스크립트에서 객체의 값을 지우느걸 불가능 하게 하려면 객체 리터럴 형식으로 객체 만들지 말고
아래처럼 Object.create(부모객체, 생성할객체의 구성정보객체) 함수 이용하면 삭제 가능 여부 설정 할 수 있다.
타입스크립트에선 그냥 타입 정의하고, 객체 생성시 그 객체가 어떤 타입인지 코딩해주면 되서 더 간단함. const obj: objType 부분 참고

const myObj = Object.create(null, {
	name: {
		value: 'Lee Hanee',
		writable: true, // true이면 'name'이라는 속성에 값 재할당 가능.
		configurable: false // false이면 delete로 속성 제거 불가능.
	}
});
myObj.name;
delete myObj.name;
*/

class Person {
	_bloodType: string;

	constructor(bloodType: string) {
		this._bloodType = bloodType;
	}

	set bloodType(bType: string) {
		if (bType === 'A' || bType === 'B' || bType === 'O' || bType === 'AB') {
			this._bloodType = bType;
		}
	}

	get bloodType() {
		return `${this.bloodType} 형`;
	}
}

// p1은 인스턴스 오브젝트임. obj와 p1은 사용법이 다르지 않음.
const p1 = new Person('B');
/* 문제가 있는 값을 속성에 대입하는 걸 막고자 할 때,
객체 내부적으론 실제 함수인데 객체 외부에서는 속성처럼 보이게 하는 방법이 있다.
Setter와 Getter라는 것이다.(Java 같은 언어의 setter, getter 과는 좀 다른 문법/용어이다)
일반 객체에선 만들수 없다. class에서만 가능.
p1.bloodType = 'C'; */
p1.bloodType;
p1.bloodType = 'C'; // 이렇게 하면 아무것도 대입 되지 않는다. set bloodType() {} 안의 if문에 의해서.



// Ch06_14. 문법-비동기 함수 (async await) 실습 2021.09.28
function delay(ms: number): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.floor(Math.random() * 10) % 2 === 0) {
				resolve('success');
			} else {
				reject('failure');
			}
		}, ms);
	});
}

delay(3000)
	.then((result: string) => {
		console.log('done promise!' + result);
	})
	.catch((error: string) => {
		console.error('fail promise' + error);
	});

async function main() {
	try {
		const result = await delay(3000);
		console.log('done async' + result);
	} catch(e) {
		console.log('fail async' + e);
	}
}

main();


// Ch06_26. 문법-제네릭 Closure 2021.10.09 실습
function identity<Type>(arg: Type): Type {
	return arg;
}

function identity2<T>(arg: T): T {
	return arg;
}

// 제너릭 호출 하는 방법1
let output = identity<string>("myString");

// 제너릭 호출 하는 방법2
let ouput2 = identity("myString");

// 배열을 인자로 받는 제너릭 사용 예들 
function loggingIdentity<Type>(arg: Type[]): Type[] {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}


// 함수 타입 변수 정의 하는 방법
function identity<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: <Type>(arg: Type) => Type = identity;


// 제네릭 인터페이스를 작성하는 법은 아래와 같다
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}
function identity<Type>(arg: Type): Type {
  return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;


//  제네릭 클래스 (Generic Classes)는 인터페이스와 형태가 비슷하다
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}
 
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 제네릭 제약조건 (Generic Constraints)
// 앞쪽의 예제를 보면, 특정 타입들로만 동작하는 제네릭 함수를 만들고 싶을 수 있다.
// 앞서 loggingIdentity 예제에서 arg의 프로퍼티 .length에 접근하기를 원하지만,
// 컴파일러는 모든 타입에서 .length 프로퍼티를 가짐을 증명할 수 없으므로 경고를 하기도 한다.
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length); // Property 'length' does not exist on type 'Type'.
  return arg;
}

// any와 모든 타입에서 동작하는 대신에, .length 프로퍼티가 있는 any와 모든 타입들에서 작동하는 것으로 제한하고 싶습니다. 타입이 이 멤버가 있는 한 허용하지만, 최소한 .length 가 있어야 합니다. 그렇게 하려면 Type 가 무엇이 될 수 있는지에 대한 제약 조건을 나열해야 합니다.
// 이를 위해 우리의 제약조건이 명시하는 인터페이스를 만듭니다. 여기 하나의 프로퍼티 .length를 가진 인터페이스를 생성하였고, 우리의 제약사항을 extends 키워드로 표현한 인터페이스를 이용해 명시합니다:
interface Lengthwise {
  length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// 제네릭 함수는 이제 제한되어 있기 때문에 모든 타입에 대해서는 동작하지 않는다
loggingIdentity(3); // Argument of type 'number' is not assignable to parameter of type 'Lengthwise'.

// 대신 필요한 프로퍼티들이 있는 타입의 값을 전달해야 한다
loggingIdentity({ length: 10, value: 3 });


/* 제네릭 제약조건에서 타입 매개변수 사용 (Using Type Parameters in Generic Constraints)

다른 타입 매개변수로 제한된 타입 매개변수를 선언할 수 있습니다. 
이름이 있는 객체에서 프로퍼티를 가져오고 싶은 경우를 예로 들어 봅시다.
실수로 obj에 존재하지 않는 프로퍼티를 가져오지 않도록 하기 위해 두 가지 타입에 제약조건을 두었습니다.
 */
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "a");
getProperty(x, "m");

// 제네릭에서 클래스 타입 사용 (Using Class Types in Generics)
// 제네릭을 사용하는 TypeScript에서 팩토리를 생성할 때 생성자 함수로 클래스 타입을 참조해야 합니다. 예를 들면:
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

// 고급 예제에서는 prototype 프로퍼티를 사용하여 생성자 함수와 클래스 타입의 인스턴스 사이의 관계를 유추하고 제한합니다.
// 이 패턴은 mixins 디자인 패턴을 만드는 데에 사용되었습니다.
class BeeKeeper {
  hasMask: boolean;
}
class ZooKeeper {
  nametag: string;
}
class Animal {
  numLegs: number;
}
class Bee extends Animal {
  keeper: BeeKeeper;
}
class Lion extends Animal {
  keeper: ZooKeeper;
}
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
createInstance(Lion).keeper.nametag; // 타입검사!
createInstance(Bee).keeper.hasMask;  // 타입검사!