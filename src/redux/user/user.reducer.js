import userActionTypes from "./user.types";
import { isAuthenticatedCheck ,setUserInfo} from './user.utils';

const INITIAL_STATE ={
    userInfo:setUserInfo(localStorage.getItem('userInfo')),
    token: null,
    expiresAt: localStorage.getItem('expiresAt'),
    name:localStorage.getItem('name'),
    isLoading:false,
    errors:undefined,
    isAuthenticated:isAuthenticatedCheck([localStorage.getItem('expiresAt')])
}

const userReducer = (state=INITIAL_STATE,action) =>{
    switch (action.type) {
        case userActionTypes.SIGN_IN_START:
        case userActionTypes.SIGN_UP_START:
            return{
                ...state,
                isLoading:true,
                errors:''
            }
        case userActionTypes.SIGN_IN_SUCCESS:
            return{
                ...state,
                isLoading:false,
                userInfo:action.payload.userInfo,
                token: action.payload.token,
                expiresAt: action.payload.expiresAt,
                name:action.payload.name,
                isAuthenticated:isAuthenticatedCheck([action.payload.expiresAt])
            }
        case userActionTypes.SIGN_UP_SUCCESS:
            return{
                ...state,
                isLoading:false,
                errors:undefined
            }
        case userActionTypes.SIGN_IN_FAILURE:
        case userActionTypes.SIGN_UP_FAILURE:
            return{
                ...state,
                isLoading:false,
                errors:action.payload
            }
        case userActionTypes.SIGN_OUT:
            return{
                ...state,
                userInfo:'',
                token: '',
                expiresAt: '',
                isAuthenticated:false,
                errors:undefined
            }
        default:
            return state;
    }
}

export default userReducer