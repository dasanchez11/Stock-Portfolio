import axios,{authAxios} from "../../api/api";
import {UserActionTypes, UserResponse,SignInData,SingUpData} from "./user.types";
import {signInFunction} from './user.utils'
import { createAction,Action,ActionWithPayload } from "../redux.utils";
import{Dispatch,AnyAction} from 'redux'


/// SIGN IN ACTIONS
export const signInStart = () => createAction(UserActionTypes.SIGN_IN_START)
export const signInSuccess = (value:UserResponse) =>createAction(UserActionTypes.SIGN_IN_SUCCESS,value)
export const signInFailure = (value:Error) =>createAction(UserActionTypes.SIGN_IN_FAILURE,value)

export type SignInStart =  Action<UserActionTypes.SIGN_IN_START>
export type SignInSuccess = ActionWithPayload<UserActionTypes.SIGN_IN_SUCCESS,UserResponse>
export type SignInFailure = ActionWithPayload<UserActionTypes.SIGN_IN_FAILURE,Error>

export type SignInActions = SignInStart|SignInSuccess|SignInFailure


/// SIGN UP IN ACTIONS
export const signUpStart = () => createAction(UserActionTypes.SIGN_UP_START)
export const signUpSuccess = () =>createAction(UserActionTypes.SIGN_UP_SUCCESS)
export const signUpFailure = (value:Error) =>createAction(UserActionTypes.SIGN_UP_FAILURE,value)

/// SIGN UP TYPES
export type SignUpStart = Action<UserActionTypes.SIGN_UP_START>
export type SignUpSuccess = Action<UserActionTypes.SIGN_UP_SUCCESS>
export type SignUpFailure = ActionWithPayload<UserActionTypes.SIGN_UP_FAILURE,Error>

export type SignUpActions = SignUpStart|SignUpSuccess|SignUpFailure


//ForgotPassword
export const forgotPasswordStart = () => createAction(UserActionTypes.FORGOT_PASSWORD_START)
export const forgotPasswordSuccess = () => createAction(UserActionTypes.FORGOT_PASSWORD_SUCCESS)
export const forgotPasswordFailure = (error:Error) => createAction(UserActionTypes.FORGOT_PASSWORD_FAILURE,error)

//FORGOT PASSWORD TYPES

export type ForgotPasswordStart = Action<UserActionTypes.FORGOT_PASSWORD_START>
export type ForgotPasswordSuccess = Action<UserActionTypes.FORGOT_PASSWORD_SUCCESS>
export type ForgotPasswordFailure = ActionWithPayload<UserActionTypes.FORGOT_PASSWORD_FAILURE,Error>

export type ForgotPasswordActions = ForgotPasswordStart|ForgotPasswordSuccess|ForgotPasswordFailure


//SIGN OUT ACTIONS
export const signOut = () =>createAction(UserActionTypes.SIGN_OUT)
export type SignOut = Action<UserActionTypes.SIGN_OUT>


export type UserActions = SignInActions|SignUpActions|ForgotPasswordActions|SignOut



export const signInUserAsync = (data:SignInData) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        dispatch(signInStart())
        const result = await axios.post('auth/login',{email:data.email,password:data.password})
        authAxios.defaults.headers.common['Authorization'] = `Bearer `+result.data.token
        signInFunction(result)
        dispatch(signInSuccess(result.data))
    } catch (error) {
        dispatch(signInFailure(error as Error))
    }
}

export const signUpUserAsync = (data:SingUpData) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        dispatch(signUpStart())
        const result = await axios.put('auth/signup',{data})
        signInFunction(result)
        dispatch(signUpSuccess())
    } catch (error) {
        dispatch(signUpFailure(error as Error))
    }
}

export const forgotPasswordAsync = (data:{email:string}) => async (dispatch:Dispatch<AnyAction>) =>{
    try {
        const {email} = data
        dispatch(forgotPasswordStart())
        await axios.post('auth/resetpassword',{email})
        dispatch(forgotPasswordSuccess())
    } catch (error) {
        dispatch(forgotPasswordFailure(error as Error))
    }
}

