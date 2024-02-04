import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as storeLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/auth'
import Logo from './header/logo'
import { Input, Button } from './index'


function Signup() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(null);
    const {register, handleSubmit} = useForm();

    const signUp = async(data) => {
        setError('');
        try {
            const user = await authService.createAccount(data);
            if(user) {
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
    <div className='w-full flex justify-center items-center'>
        <div className='mx-auto w-full bg-gray-100 rounded-xl border border-black/10 p-10'>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>Sign Up to your Account</h2>
            <p className='mt-2 text-center text-black text-base'>
                Already have an Account?
                <Link
                    to={'/login'}
                    className='font-medium text-primary transistion-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {error && <p className=''>{error}</p>}

            <form onSubmit={handleSubmit(signUp)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        type='text'
                        label='Username:'
                        className=''
                        {...register('username', {
                            required: true
                        })}
                    />
                    <Input
                        type='email'
                        label='Email:'
                        className=''
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
                    >Sign Up</Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup
