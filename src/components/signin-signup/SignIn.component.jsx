import React, { useEffect, useRef, useState } from 'react'
import { forgotPasswordAsync, signInUserAsync } from '../../redux/user/user.actions'
import { Navigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Spinner from '../spinner/Spinner.component'
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import ForgotPwd from './ForgotPwd.component';


// export type UserInfoLogin = {
//     email:string;
//     password:string
// }

// export type UserLoginValid = {
//     email:boolean;
//     password:boolean
// }

// interface IloginErrors  {
//     email:string;
//     password:string;
// }


const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const SignIn = () => {
    const [showErrors, setShowErrors] = useState(true)
    const isAuthenticated = useAppSelector(state => state.user.isAuthenticated)
    const loading = useAppSelector(state => state.user.isLoading)
    const authErrors = useAppSelector(state => state.user.errors)
    const [userInfoLogin, setUserInfoLogin] = useState({
        email: '',
        password: ''
    })
    const [visiblePwd, setVisiblePwd] = useState(false)
    const [forgotPassword, setForgotPassword] = useState(false)
    const [pwdRecovery, setPwdRecovery] = useState('')

    const dispatch = useAppDispatch()


    const [loginValid, setLoginValid] = useState({
        email: false,
        password: false
    })

    const [isSubmit, setIsSubmit] = useState(false)
    const okInfo = useRef(false)


    const [loginErrors, setLoginErrors] = useState({ email: '', password: '' })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setUserInfoLogin({ ...userInfoLogin, [name]: value })
    }

    const handleSubmit = (e) => {
        setShowErrors(false)
        e.preventDefault()
        if (forgotPassword) {
            setUserInfoLogin({
                email: '',
                password: ''
            })
            setTimeout(async () => {
                await dispatch(forgotPasswordAsync({ email: pwdRecovery }))
                setShowErrors(true)
            })
        } else {
            setPwdRecovery('')
            setLoginErrors(validate(userInfoLogin, loginValid))
            setIsSubmit(true)
            setTimeout(async () => {
                if (okInfo.current) {
                    await dispatch(signInUserAsync(userInfoLogin))
                    setShowErrors(true)
                }
            })
        }
    }

    useEffect(() => {
        okInfo.current = false
        const val1 = Object.values(loginErrors)[1]?.length
        const val0 = Object.values(loginErrors)[0]?.length
        if (val0 === 0 && val1 === 0 && isSubmit) {
            okInfo.current = true
        }
    }, [loginErrors, isSubmit]);

    useEffect(() => {
        const result = EMAIL_REGEX.test(userInfoLogin.email)
        setLoginValid(state => ({ ...state, 'email': result }))
    }, [userInfoLogin.email, setLoginValid])


    useEffect(() => {
        const result = PWD_REGEX.test(userInfoLogin.password)
        setLoginValid(state => ({ ...state, 'password': result }))
    }, [userInfoLogin.password, setLoginValid])


    const validate = (infoLogin, loginValid) => {
        const errors = { email: '', password: '' }
        if (!infoLogin.email) {
            errors.email = 'email is required'
        } else if (!loginValid.email) {
            errors.email = 'email is invalid'
        }
        if (!infoLogin.password) {
            errors.password = 'password is required'
        } else if (!loginValid.password) {
            errors.password = 'password is invalid'
        }
        return errors
    }

    useEffect(() => {
        setShowErrors(false)
    }, [forgotPassword])


    return (
        <>
            {isAuthenticated && <Navigate to='/dashboard' />}
            {!authErrors && forgotPassword && showErrors && <Navigate to='/'/>  }
            <section className='relative bg-neutral-900 w-full h-screen text-white pt-[80px] flex justify-center'>
                <div className='h-auto w-[80vw] md:w-[60vw] lg:w-[40vw] bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg m-auto'>
                    <form autoComplete='off' onSubmit={handleSubmit} >
                        {showErrors && authErrors && authErrors !== '' ?
                            (<p className='bg-red-300 border border-red-500 text-red-500 p-3 rounded-md text-center'>{authErrors?.response?.data?.message}</p>)
                            : ''}
                        <h1 className='text-white text-center text-3xl font-bold my-2 top-0 p-3 border-b border-b-green-600'>{forgotPassword ? 'Recover Password' : 'Sign In'}</h1>
                        <div className="ui divider"></div>
                        <div className="ui form">
                            {forgotPassword ? <ForgotPwd pwdRecovery={pwdRecovery} setPwdRecovery={setPwdRecovery} />
                                : (
                                    <div className={``}>
                                        <div>
                                            <div className="flex flex-col justify-center w-full max-w-[17rem]  m-auto gap-2 p-2">
                                                <label>Email</label>
                                                <input
                                                    className='border-b-4 border-green-600 outline-none text-black'
                                                    autoComplete='off'
                                                    type="email"
                                                    name="email"
                                                    placeholder="email"
                                                    value={userInfoLogin.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <p className='text-center border-red-400 text-red-600'>{loginErrors.email}</p>
                                        </div>
                                        <div>
                                            <div className="flex flex-col justify-center w-full max-w-[17rem] m-auto gap-2 p-2">
                                                <label>Password</label>
                                                <div className='relative'>
                                                    <input
                                                        className='border-b-4 border-b-green-600  outline-none text-black w-full'
                                                        autoComplete='off'
                                                        type={!visiblePwd ? "password" : 'text'}
                                                        name="password"
                                                        placeholder="Password"
                                                        value={userInfoLogin.password}
                                                        onChange={handleChange}
                                                    />
                                                    <div onClick={() => setVisiblePwd(!visiblePwd)} className='absolute text-green-600 top-1 right-1 cursor-pointer'>
                                                        {!visiblePwd ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className='text-center border-red-400 text-red-600'>{loginErrors.password}</p>
                                        </div>
                                    </div>
                                )}

                            <div className='flex items-center m-6'>
                                <button className=' bg-green-600 px-3 py-2 rounded-lg m-auto text-2xl hover:bg-transparent border border-green-600 flex flex-row items-center'>{loading ? <Spinner /> : forgotPassword ? 'Recover' : 'Signin'}</button>
                            </div>
                            <span className='cursor-pointer flex flex-row justify-center underline' onClick={() => setForgotPassword(state => !state)}>
                                {forgotPassword ? "Already a member?" : "Forgot your password?"}
                            </span>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default SignIn