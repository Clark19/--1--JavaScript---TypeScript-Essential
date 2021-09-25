// Ch06_10. 문법-인터페이스와 타입 별칭 인강 실습  2021.09.25 타입 정의

export type YesOrNo = 'Y' | 'N';
// union(|) 키워드 사용.
export type dyOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';
export enum dyOfTheWeek {'월', '화', '수', '목', '금', '토', '일'};

export type Name = string;
export type Email =string;
export type FooFunction = () => string;

export interface IUser {
    readonly id: number;
    readonly name: Name;
    email: string;
    receiveInfo: boolean;
    active: YesOrNo;
}

export interface IUser {
    address?: string;
}

export type TUser = {
    readonly id: number;
    readonly name: string;
    email: Email;
    receiveInfo: boolean;
    active: YesOrNo;
}

// type alias는 인터페이스 처럼 중복(merge)해서 정의 불가능
// export type TUser = {
//     address?: string;
// }

// 상속시 extends 키워드 사용
export interface IUserProfile extends IUser {
    profileImage: string;
    github?: string;
    twitter?: string;
}

// &  - 상속시 intersection(&) 키워드 사용
export type TUserProfile = IUser & {
    profileImage: string;
    github?: string;
    twitter?: string;
}

export interface Color {
    fontColor: string;
    strokeColor: string;
    borderColor: string;
    backgroundColor: string;
}

export type Display = {
    display: 'none' | 'block';
    visibility: boolean;
    opacity: number;
}

export type Geometry = {
    width: number;
    height: number;
    padding: number;
    margin: number;
}

export interface IStyle extends Color, Display, Geometry {
    tagName: string;
}

export type TStyle = Color & Display & Geometry & {
    tagName: string;
}

// 객체에 대한 형식 정의
export interface IOnlyNumberValueObject {
    [key:string]: number;
}

export type TOnlyBooleanValueObject = {
    [prop:string]: boolean;
}

// 함수에 대한 시그니쳐(형식) 정의
export interface IGetApi {
    (url:string, search?: string): Promise<string>
}

export type TGetApi = {
    (url:string, search?: string): Promise<string>
}

export interface IRect {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface IRectConstruct {
    new (x: number, y:number, width:number, height: number): IRect;
}