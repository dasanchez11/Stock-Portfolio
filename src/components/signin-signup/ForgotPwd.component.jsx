import React from 'react'

const ForgotPwd = ({pwdRecovery,setPwdRecovery}) => {
    return (
        <div>
            <div className="flex flex-col justify-center w-full max-w-[17rem]  m-auto gap-2 p-2">
                <label>Type your email</label>
                <input
                    className='border-b-4 border-green-600 outline-none text-black'
                    autoComplete='off'
                    type="text"
                    name="emailRecovery"
                    placeholder="email"
                    value={pwdRecovery}
                    onChange={(e)=>setPwdRecovery(e.target.value)}
                />
            </div>
        </div>
    )
}

export default ForgotPwd