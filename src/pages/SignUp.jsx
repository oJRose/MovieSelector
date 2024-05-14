import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

export const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const { signUp } = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className='w-full h-[calc(100vh-85px)] flex justify-center items-center'>
            <div className='w-[350px] h-[450px] bg-slate-500 rounded-xl'>
                <div className='w-full bg-black/70 h-full p-7 rounded-xl flex flex-col justify-between'>

                    <h1 className=' text-2xl font-bold'>Sign Up</h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-2 rounded bg-gray-700 ' 
                            type="email" 
                            placeholder='Email' />
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 rounded bg-gray-700  ' 
                            type="password" 
                            placeholder='Password'/>
                        <button className='w-full text-gray-700 bg-gray-300 rounded p-2'>Sign Up</button>
                    </form>

                    <div>
                        <div className='w-full flex justify-between py-3 text-sm'>
                            <p><input className='mr-1' type="checkbox"/> Remember me</p>
                            <p>Need Help?</p>
                        </div>

                        <div className='flex gap-2'>
                            <p>Already subscribed?</p>
                            <Link to='/login'>
                                Sign In
                            </Link>
                        </div>
                    </div>

                    
                </div> 
            </div>
        </div>
    </>
  )
}
