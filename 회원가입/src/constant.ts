import { ValidateRule } from "./types";

// 정규식 표현하는 방법은 두가지, 1.정규식 리터럴로 표기, 2. new RegExp(문자열) 방식

// 1.정규식 리터럴로 표기
export const RequireRule: ValidateRule = {
  rule: /.+/,
  match: true,
  message: '필수 입력 항목입니다.',
};

export const CantContainWhitespace: ValidateRule = {
  rule: /\s/,
  match: false,
  message: '공백을 포함할 수 없습니다.',
};

export const CantStartNumber: ValidateRule = {
  rule: /^\d/,
  match: false,
  message: '숫자로 시작하는 아이디는 사용할 수 없습니다.',
}

/* 2. new RegExp(문자열) 방식 - 입력 값으로 정규식을 생성해야 할 땐 리터럴 표기 못하므로
  문자열 방식으로 처리 할 수 있는 new RegExp(` `) 방식 사용. 게다가 여기선 함수 방식 이용
  !! 입력 값을 데이터로 처리할 때 사용하는 방법이므로 암기 */
export const MinimumLengthLimit = (limit: number): ValidateRule => ({
  rule: new RegExp(`(.){${limit}}`),
  match: true,
  message: `최소한 ${limit}글자 이상 이어야 합니다.`,
});
