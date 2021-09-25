// Ch06_10. 문법-인터페이스와 타입 별칭 인강 실습  2021.09.25 . 타입 사용
import * as type from './type';

const foo: type.FooFunction = function () {
    return '무의미 함수';
}

const iUser: type.IUser = {
    id:1
    , name: 'myname'
    , email:'mail@ddd.com'
    , receiveInfo:false
    , active: 'Y'
}

const iUserProfile:type.IUserProfile = {
    id:1
    , name:'myname'
    , email:'bill@mail.com'
    , receiveInfo: false,
    active: 'Y',
    profileImage: 'https://...',
    github: 'okay',
}

const IUserProfiles: type.TUser[] = [];

const iStyle: type.IOnlyNumberValueObject = {
    borderWidth:5,
    width:300,
    height:100
}

const TStyle: type.TOnlyBooleanValueObject = {
    border:true,
    visible:false,
    display:true
}

const getApi: type.IGetApi = (url, search = '') => {
    return new Promise(resolve => resolve('OK'));
}

getApi('./api/users').then(data => console.log(data));

// interface를 class 사용로 구현시 implements 사용. 기존 자바 문법과 유사.
class Rect implements type.IRect {
    id : number;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number){
        this.id = Math.random() * 100000;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

function createDefaultRect(cstor: type.IRectConstruct) {
    return new cstor(0, 0, 100, 100);
}

const rect1 = new Rect(0,0,100,20);
const rect2 = createDefaultRect(Rect);