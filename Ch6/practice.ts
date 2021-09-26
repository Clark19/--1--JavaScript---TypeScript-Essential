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