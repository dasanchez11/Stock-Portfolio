import axios from "../../api/api";
import userActionTypes from "./user.types";
import {signOutFunction,signInFunction} from './user.utils'


/// SIGN IN ACTIONS
export const signInStart = () =>{
    return{
    type:userActionTypes.SIGN_IN_START
    }
}

export const signInSuccess = (value) =>{
    return{
    type:userActionTypes.SIGN_IN_SUCCESS,
    payload:value
    }
}

export const signInFailure = (value) =>{
    return{
        type: userActionTypes.SIGN_IN_FAILURE,
        payload: value
    }
}

/// SIGN UP IN ACTIONS

export const signUpStart = () =>{
    return{
    type:userActionTypes.SIGN_UP_START
    }
}

export const signUpSuccess = () =>{
    return{
    type:userActionTypes.SIGN_UP_SUCCESS
    }
}

export const signUpFailure = (value) =>{
    return{
        type: userActionTypes.SIGN_UP_FAILURE,
        payload: value
    }
}


export const signOut = () =>{
    signOutFunction()
    return{
        type:userActionTypes.SIGN_OUT
    }
}



export const signInUserAsync = (data) => async (dispatch) =>{
    try {
        dispatch(signInStart())
        const result = await axios.post('auth/login',{email:data.email,password:data.password})
        signInFunction(result)
        dispatch(signInSuccess(result.data))
    } catch (error) {
        dispatch(signInFailure(error.message))
    }
}

export const signUpUserAsync = (data) => async (dispatch) =>{
    try {
        dispatch(signUpStart())
        const result = await axios.put('auth/signup',{data})
        signInFunction(result)
        dispatch(signUpSuccess())
    } catch (error) {
        dispatch(signUpFailure(error.message))
    }
}

