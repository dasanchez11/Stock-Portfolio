import React, {useState,useEffect,useRef} from 'react'
import { useDispatch ,useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { signUpUserAsync } from '../../redux/user/user.actions';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import Spinner from '../spinner/Spinner.component'




const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // eslint-disable-line
const NUMBER_REGEX = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/; // eslint-disable-line

const SignUp = () => {
    const dispatch = useDispatch()
    const authErrors = useSelector(state =>state.user.errors)
    const [visiblePwd, setVisiblePwd] = useState(false)
    const [register,setRegister] = useState(false)
    const loading = useSelector(state =>state.user.isLoading)
  

    useEffect(()=>{
        if(authErrors===''&& loading ===false){
            setRegister(true)
        }
    },[authErrors,loading])

    const [userInfoLogin,setUserInfoLogin] = useState({
        email:'',
        password:'',
        firstName:'',
        lastName:'',
        phone:''
    })

    const [loginValid,setLoginValid] = useState({
        email:false,
        password:false,
        firstName:false,
        lastName:false,
        phone:false
    })
    const [isSubmit, setIsSubmit] = useState(false)
    const okInfo = useRef(false)
    const [loginErrors,setLoginErrors] = useState({})

    
    const handleChange = (e) =>{
        setUserInfoLogin({...userInfoLogin,[e.target.name]:e.target.value})
    }

  

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoginErrors(validate(userInfoLogin,loginValid))
        setIsSubmit(true)
        setTimeout(()=>{
            if(okInfo.current){
                dispatch(signUpUserAsync(userInfoLogin))   
            }
        },1000)
    }

    useEffect(() => {
        if (Object.keys(loginErrors).length === 0 && isSubmit) {
          okInfo.current = true
        }
      }, [loginErrors,isSubmit]);

    useEffect(()=>{
        const result = EMAIL_REGEX.test(userInfoLogin.email)
        setLoginValid(state=>({...state,'email':result}))
    },[userInfoLogin.email,setLoginValid])

    useEffect(()=>{
        const result = PWD_REGEX.test(userInfoLogin.password)
        setLoginValid(state => ({...state,'password':result}))
    },[userInfoLogin.password,setLoginValid])

    useEffect(()=>{
        const result = NUMBER_REGEX.test(userInfoLogin.phone)
        setLoginValid(state => ({...state,'phone':result}))
    },[userInfoLogin.phone,setLoginValid])
    

    const validate = (infoLogin,loginValid) =>{
        const errors = {};
        if(!infoLogin.email){
            errors.email = 'Email is required'
        }else if (!loginValid.email){
            errors.email = 'Email is invalid'
        }
        if(!infoLogin.password){
            errors.password = 'Password is required'
        }else if (!loginValid.password){
            errors.password = 'Password is invalid'
        }
        if(!infoLogin.firstName){
            errors.firstName = 'First Name is required'
            setLoginValid(state => ({...state,'firstName':false}))
        }
        if(!infoLogin.lastName){
            errors.lastName = 'Last Name is required'
            setLoginValid(state => ({...state,'lastName':false}))
        }
        if(!infoLogin.phone){
            errors.phone = 'Phone is required'
        }else if (!loginValid.phone){
            errors.phone = 'Phone is invalid'
        }
       return errors
    }

  return (
     <>
     {register && <Navigate to='/signin'/>}
    <section className='relative bg-neutral-900 w-full h-screen text-white pt-[80px] flex justify-center'>
    <div className='h-auto w-[80vw] md:w-[60vw] lg:w-[40vw] bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg m-auto'>
        <form  autoComplete='off' onSubmit={handleSubmit} >
            {authErrors && authErrors !== '' ? 
                        <p className='bg-red-300 border border-red-500 text-red-500 p-3 rounded-md text-center'>{authErrors.response.data.message}</p>
                    : ''}
            <h1 className='text-white text-center text-3xl font-bold my-2 top-0 p-3 border-b border-b-green-600'>{'Register'}</h1>
            <div className="ui divider"></div>
            <div className="ui form">
            <div className={`grid grid-cols-2 gap-3 text-sm sm:text-lg`}>
                <div>
                    <div className="flex flex-col justify-center w-full max-w-[17rem]  m-auto gap-2 p-2">
                        <label>Email</label>
                        <input
                        className='border-b-4 border-green-600 outline-none text-black'
                        autoComplete='off'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userInfoLogin.email}
                        onChange={handleChange}
                        // required
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
                            // required
                            />
                            <div onClick={()=>setVisiblePwd(!visiblePwd)} className='absolute text-green-600 top-2 right-1 cursor-pointer'>
                                {!visiblePwd ? <AiFillEyeInvisible/>:<AiFillEye/>}
                            </div>
                            
                        </div>
                    </div>
                    <p className='text-center border-red-400 text-red-600'>{loginErrors.password}</p>
                </div>
                <div>
                    <div className="flex flex-col justify-center w-full max-w-[17rem] m-auto gap-2 p-2 ">
                        <label>First Name</label>
                        <input
                        className='border-b-4 border-green-600 outline-none text-black'
                        autoComplete='off'
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={userInfoLogin.firstName}
                        onChange={handleChange}
                        // required
                        />
                    </div>
                    <p className='text-center border-red-400 text-red-600'>{loginErrors.firstName}</p>
                </div>
                <div>
                    <div className="flex flex-col justify-center w-full max-w-[17rem] m-auto gap-2 p-2 ">
                        <label>Last Name</label>
                        <input
                        className='border-b-4 border-green-600 outline-none text-black'
                        autoComplete='off'
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={userInfoLogin.lastName}
                        onChange={handleChange}
                        // required
                        />
                    </div>
                    <p className='text-center border-red-400 text-red-600'>{loginErrors.lastName}</p>
                </div>
                <div>
                    <div className="flex flex-col justify-center w-full max-w-[17rem] m-auto gap-2 p-2 ">
                        <label>Phone</label>
                        <input
                        className='border-b-4 border-green-600 outline-none text-black'
                        autoComplete='off'
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        value={userInfoLogin.phone}
                        onChange={handleChange}
                        // required
                        />
                    </div>
                    <p className='text-center border-red-400 text-red-600'>{loginErrors.phone}</p>
                </div>
            </div>
            <div className='flex items-center m-6'>
                <button className=' bg-green-600 px-3 py-2 rounded-lg m-auto text-2xl hover:bg-transparent border border-green-600 flex flex-row'>{loading? <Spinner/> : ''}{loading? 'Registering' : 'Register'}</button>
            </div>
            </div>
        </form>
    </div>
    </section>
     </> 
  )
}

export default SignUp