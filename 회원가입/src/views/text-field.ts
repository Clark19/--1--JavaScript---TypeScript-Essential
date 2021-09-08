import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
import { RequireRule } from '../constant';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
}

const DefaultProps: Props = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default class TextField {
  private template = template;
  private container: string;
  private data: Props;  
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    // 사용자가 입력한 값 == data
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    nextTick(this.attachEventHandler);
  }

  private validate = (): ValidateRule | null => {
    const target = this.data.text ? this.data.text.trim() : '';

    // 배열을 filter()로 돌면서 test()로 정규식 매칭 여부 판단함.
    const invalidateRules = this.validateRules
      .filter(validateRule => validateRule.rule.test(target) !== validateRule.match);

    // 기획따라 UX를 선택하며 됨. 룰 위반이 2개이상일때 어떤식으로 에러 출력 하나만 할지 둘 이상할지
    // 기획에 따라 아래 코드가 달라짐. 현재는 무조건 첫번재 룰 위반만 알려주는 정책으로 구현.
    return (invalidateRules.length > 0) ? invalidateRules[0] : null;
  }

  private buildData = () => {
    const isInvalid: ValidateRule | null = this.validate();

    // 최초엔 사용자가 아무 것도 안했으므로 밸리데이션이 걸려도 무시하고 사용자에게 피드백을 주지 않게 하기 위한 조건절.
    if (this.updated) {
      return {
        ...this.data, 
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: !!isInvalid ? isInvalid.message : ''
      }
    } else {
      return {
        ...this.data, 
        updated: this.updated,
        valid: true,
        validateMessage: ''
      }
    }
  }

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;
  
    if (id === this.data.id) {
      this.updated = true; // 최초에 변경이 발생했는지 여부. 즉, 한번이라도 입력했는지 여부를 나타내는 상태 값. 그래서 변경됐으니 이 루틴 탄거므로 true 세팅.
      this.data.text = value;
      this.update();
    }
  }

  /* 이벤트 핸들러를 자신에 걸지않고 부모에 건다. 그래서 onChange()에
     이벤트 들어오면 어떤 자식의 이벤트인지 id로 체크하여 해당 ui coponent만 update()호출.
     이벤트의 버블링/캡쳐링 이용하는 것임. */
  private attachEventHandler = () => {
    document.querySelector(this.container)?.addEventListener('change', this.onChange);
  }

  private update = () => {
    const container = document.querySelector(`#field-${this.data.id}`) as HTMLElement;
    const docFrag = document.createElement('div');

    // 밸리데이션응 buildDate()에서 함. 그 결과를 template로 넘기면 UI(HTML)을 변경하는 것임. 즉, HTML을 template에서 변경하면 사용자에게 알림을 주는 것이됨.
    docFrag.innerHTML = this.template(this.buildData());
    /* render() 함수와 다르게 innderHtml만 대입하는 이유는 이벤트 핸들러를 상위 컴포넌트에 붙였는데 돔으로 붙이면
        이벤트 핸들러 까지 날라가 버려서 안의 내용만 업데이트 하는 형식으로 함. 메모리 문제도 생길수있음.
    */
    container.innerHTML = docFrag.children[0].innerHTML;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    return this.data.text || '';
  }

  public get isValid(): boolean {
    return !this.validate();
  }

  public addValidateRule = (rule:ValidateRule) => {
    this.validateRules.push(rule);
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  }
}
