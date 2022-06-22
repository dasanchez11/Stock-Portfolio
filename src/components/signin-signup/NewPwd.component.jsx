import axios from '../../api/api';
import React,{useState,useEffect, useCallback} from 'react'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { Navigate, useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner.component'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; // eslint-disable-line


const NewPwd = () => {
    const {token} = useParams()

    const [newPassword,setNewPassword] = useState('')
    const [loginValid,setLoginValid] = useState(false)
    const [loginErrors,setLoginErrors] = useState('')
    const [visiblePwd, setVisiblePwd] = useState(false)
    const [errors,setErrors] = useState('')
    const [data,setData] = useState('')
    const [initialError,setInitialError] = useState(undefined)
    const [isSubmit,setIsSubmit] = useState(false)
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)

    const createNewPassword = useCallback(async () =>{
        try {
            setLoading(true)
            await axios.post('auth/newpassword',{data})
            setLoading(false)
            setSuccess(true)
        } catch (error) {
            setLoading(false)
            setErrors(error)
        }
    },[setLoading,setErrors,setSuccess,data])

    useEffect(()=>{
        const fetch = async() => {
            try {
               const {data} = await axios.get(`/auth/changepassword/${token}`)
               const array = {}
               array.id = data.data.user
               array.token = data.data.token
               setData(array)
            } catch (error) {
                setInitialError(error)
            }
        }
        fetch()
    },[token])

    useEffect(()=>{
        const result = PWD_REGEX.test(newPassword)
        setLoginValid(result)
    },[newPassword,setLoginValid])

    const handleChange = (e) =>{
        setNewPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setData(state => ({...state,newPassword:newPassword}))
        setLoginErrors(validate(newPassword, loginValid))
        setIsSubmit(true)
    }
   

    useEffect(() => {        
        if (loginErrors==='' && isSubmit) {
            createNewPassword()
            setIsSubmit(false)
        }
    }, [loginErrors, isSubmit,setIsSubmit,createNewPassword]);

    const validate = (infologin, loginValid) => {
        let errors = ''
        if (!infologin) {
            errors = 'password is required'
        } else if (!loginValid) {
            errors = 'password is invalid'
        }
        return errors
    }
  return (
    <section className='relative bg-neutral-900 w-full h-screen text-white pt-[80px] flex justify-center'>
        {initialError && <Navigate to='/'/>}
        {success  && <Navigate to='/signin'/>}
    <div className='h-auto w-[80vw] md:w-[60vw] lg:w-[40vw] bg-neutral-800 p-6 shadow-md shadow-neutral-800 rounded-lg m-auto'>
        <form  autoComplete='off' onSubmit={loading? ()=>{} : handleSubmit} >
            {errors ? 
                    <p className='bg-red-300 border border-red-500 text-red-500 p-3 rounded-md text-center'>{errors?.response?.data?.message}</p>
                    : ''}
            <h1 className='text-white text-center text-3xl font-bold my-2 top-0 p-3 border-b border-b-green-600'>{'Change your Password'}</h1>
            <div className="ui divider"></div>
            <div className="ui form">
            <div className={`grid grid-cols-1 gap-3 text-sm sm:text-lg`}>
                
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
                            value={newPassword}
                            onChange={handleChange}
                            // required
                            />
                            <div onClick={()=>setVisiblePwd(!visiblePwd)} className='absolute text-green-600 top-2 right-1 cursor-pointer'>
                                {!visiblePwd ? <AiFillEyeInvisible/>:<AiFillEye/>}
                            </div>
                            
                        </div>
                    </div>
                    <p className='text-center border-red-400 text-red-600'>{loginErrors}</p>
                </div>
            </div>
            <div className='flex items-center m-6'>
                <button className=' bg-green-600 px-3 py-2 rounded-lg m-auto text-2xl hover:bg-transparent border border-green-600 flex flex-row'>{loading ? <Spinner/> : 'Change Password'}</button>
            </div>
            </div>
        </form>
    </div>
    </section>
  )
}

export default NewPwd