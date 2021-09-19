// Ch6.03. 문법-타입 : 2021.09.16
// TypeScript 버전
function addAgeT(age: number): number {
    return age + 1;
}

// addAgeT()인자로 '30'같은 문자열 넣으면 미리 잡아주나 강제로 실행 시켜도 실행되긴 한다.
let ageT = addAgeT(30);


// Ch06_29. 문법-JSON 실습
const jsonString = `
{
    "name": "My Name",
    "age": 17,
    "bloodType": "A"
}
`;

try {
    // 서버로 부터 받은 jsonString
    const myJson = JSON.parse(jsonString);
    console.log(myJson.name); // 이제 객체로 사용 됨

    // JS객체를 서버로 전송시 등의 상황
    console.log(JSON.stringify(myJson));
} catch (e) {
    console.log('다시한번 시도해 주세요.')
}