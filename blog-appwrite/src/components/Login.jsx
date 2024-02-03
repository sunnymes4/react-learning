import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import Logo from './header/logo'
import { Button, Input } from './index'
import { login as storeLogin } from '../store/authSlice'
import { useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);
    const [register, handleSubmit] = useForm();

    const login = async(data) => {
        console.log(data)
        setError('')
        try {
            const session = await authService.login(data);
            if(session) {
                const userData = await authService.getCurrentUser()

                if(userData) {
                    dispatch(storeLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex items-center w-full justify-center'>
        <div className='mx-auto w-full bg-gray-100 rounded-xl border border-black/10 p-10 '>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your Account</h2>
            <p className='mt-2 text-center text-black text-base'>
                Don&apos;t have an Account?
                <Link
                    to={'/signup'}
                    className='font-medium text-primary transistion-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        type='email'
                        placeholder='Enter your email'
                        label='Email:'
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.
                                test(value) || 'Please enter a Valid Email!'
                            }
                        })}
                    />
                    <Input
                        type='password'
                        placeholder='Enter your password'
                        label='Password:'
                        {...register('password', {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.
                                test(value) || 'Please enter a Valid Password!'
                            }
                        })}
                    />
                    <Button
                        type='submit'
                    >Sign In</Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Login
