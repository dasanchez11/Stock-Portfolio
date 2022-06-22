import { UserActions } from "./user.actions";
import {UserActionTypes, UserInfo} from "./user.types";
import { isAuthenticatedCheck ,setUserInfo} from './user.utils';

export type UserState = {
    readonly userInfo:UserInfo|null,
    readonly token: string|null,
    readonly expiresAt: null|number|string,
    readonly name:string|null,
    readonly isLoading:boolean,
    readonly errors:undefined|string|Error,
    readonly isAuthenticated:boolean
}

const INITIAL_STATE:UserState ={
    userInfo:setUserInfo(localStorage.getItem('userInfo')),
    token: localStorage.getItem('token'),
    expiresAt: localStorage.getItem('expiresAt'),
    name:localStorage.getItem('name'),
    isLoading:false,
    errors:undefined,
    isAuthenticated:isAuthenticatedCheck([localStorage.getItem('token'),localStorage.getItem('expiresAt')])
}

const userReducer = (state=INITIAL_STATE,action:UserActions):UserState =>{
    switch (action.type) {
        case UserActionTypes.SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.FORGOT_PASSWORD_START:
            return{
                ...state,
                isLoading:true
            }
        case UserActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                isAuthenticated:isAuthenticatedCheck([action.payload.token,JSON.stringify(action.payload.expiresAt)]),
                isLoading:false,
                userInfo:action.payload.userInfo,
                token: action.payload.token,
                expiresAt: action.payload.expiresAt,
                name:action.payload.name
            }
        case UserActionTypes.SIGN_UP_SUCCESS:
        case UserActionTypes.FORGOT_PASSWORD_SUCCESS:
            return{
                ...state,
                isLoading:false,
                errors:''
            }
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
        case UserActionTypes.FORGOT_PASSWORD_FAILURE:
            return{
                ...state,
                isLoading:false,
                errors:action.payload
            }
        case UserActionTypes.SIGN_OUT:
            return{
                ...state,
                userInfo:null,
                token: null,
                expiresAt: null,
                isAuthenticated:false,
                errors:undefined
            }
        default:
            return state;
    }
}

export default userReducer