export enum UserActionTypes {
    SIGN_IN_START='SIGN_IN_START',
    SIGN_IN_SUCCESS='SIGN_IN_SUCCESS',
    SIGN_IN_FAILURE='SIGN_IN_FAILURE',
    SIGN_UP_START='SIGN_UP_START',
    SIGN_UP_SUCCESS='SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE='SIGN_UP_FAILURE',
    SIGN_OUT='SIGN_OUT',
    FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START',
    FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS',
    FORGOT_PASSWORD_FAILURE = 'FORGOT_PASSWORD_FAILURE'
}

export type UserInfo = {
    userId:string,
    email:string
}

export type UserResponse = {
    userInfo:UserInfo
    token: string,
    expiresAt: number,
    name:string
}

export type SignInData = {
    email:string;
    password:string
}

export type SingUpData = SignInData & {
    firstName:string,
    lastName:string,
    phone:number
}
