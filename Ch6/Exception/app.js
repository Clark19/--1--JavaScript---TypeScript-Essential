// Exception 강의 ch06_09 실습
function doException() {
    throw new Error('와우! 오류야');
}

function noException() {
    return true;
}

function callException(type) {
    if (type === 'do') {
        doException();
    } else {
        noException();
    }
}

function main() {
    try {
        callException('do');
    
        console.log('a');
    } catch(e) {
        console.log('오류: ', e);
    } finally {
        console.log('bbb finally');
        
    }
}

main();



// Ch6.03. 문법-타입 : 2021.09.16
function addAge(age) {
    return age + 1;
}

let age = addAge('30');

age = 30;
age = false;
age = {};
