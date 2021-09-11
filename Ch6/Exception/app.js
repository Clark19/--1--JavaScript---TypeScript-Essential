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