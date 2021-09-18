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