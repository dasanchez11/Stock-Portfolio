export const setUserInfo = (value) =>{
  if(value===undefined){
    return JSON.parse(value)
  }else{
    return ''
  }
}


export const signOutFunction = () =>{
    // localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    localStorage.removeItem('expiresAt')
    localStorage.removeItem('name')
}

export const signInFunction = (result) =>{
    // localStorage.setItem('token',result.data.token)
    localStorage.setItem('userInfo',JSON.stringify(result.data.userInfo))
    localStorage.setItem('expiresAt',result.data.expiresAt)
    localStorage.setItem('name',result.data.name)
}

export const isAuthenticatedCheck = (userInfo) =>{
  // const token = userInfo[0]
  // const expiresAt=userInfo[1]
  //   if(!userInfo){
  //       return false
  //   }
  //   if(!token || !expiresAt){
  //     return false;
  //   }
  //   if(!expiresAt){
  //     return false;
  //   }
  //   return new Date().getTime()/1000 < expiresAt

  const expiresAt = userInfo
  if(!expiresAt){
    return false;
  }

  return new Date().getTime()/1000 < expiresAt

}