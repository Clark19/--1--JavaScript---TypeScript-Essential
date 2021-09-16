// Ch6.03. 문법-타입 : 2021.09.16
// TypeScript 버전
function addAgeT(age: number): number {
    return age + 1;
}

// addAgeT()인자로 '30'같은 문자열 넣으면 미리 잡아주나 강제로 실행 시켜도 실행되긴 한다.
let ageT = addAgeT(30);