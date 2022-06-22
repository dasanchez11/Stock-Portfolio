import { UserInfo,UserResponse } from "./user.types"

export const setUserInfo = (value:string|null) =>{
  if(value===undefined){
    return JSON.parse(value)
  }else{
    return ''
  }
}


export const signOutFunction = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('name')
}

export const signInFunction = (result:{data:UserResponse}) =>{
    localStorage.setItem('token',result.data.token)
    localStorage.setItem('userInfo',JSON.stringify(result.data.userInfo))
    localStorage.setItem('expiresAt',JSON.stringify(result.data.expiresAt))
    localStorage.setItem('name',result.data.name)
}

export const isAuthenticatedCheck = (userInfo:[string|null,string|null]) =>{
  const token = userInfo[0]
  const expiresAt=userInfo[1]
    if(!userInfo){
        return false
    }
    if(!token || !expiresAt){
      return false;
    }
    if(!expiresAt){
      return false;
    }
    return new Date().getTime()/1000 < parseInt(expiresAt)

  /// COOKIE TOKEN

  // const expiresAt = userInfo
  // if(!expiresAt){
  //   return false;
  // }

  // return new Date().getTime()/1000 < expiresAt

}