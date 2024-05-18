import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

export const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const { logIn } = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await logIn(email, password)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className='w-full xl:h-[calc(100vh-85px)] flex justify-center items-center '>
            <div className='sm:w-[350px] sm:h-[450px] bg-[#beb8ad30] rounded-xl shadow-[#969696] shadow-sm'>
                <div className='w-full   h-full p-7 rounded-xl flex flex-col justify-between'>

                    <h1 className=' text-2xl mb-5'>Log In</h1>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='p-2 rounded bg-[#535353] text-white' 
                            type="email" 
                            placeholder='Email' />
                        <input 
                            onChange={(e) => setPassword(e.target.value)}
                            className='p-2 rounded bg-[#535353]  text-white' 
                            type="password" 
                            placeholder='Password'/>
                        <button className='w-full text-gray-700 bg-[#c6c6c6] rounded p-2 shadow-[#969696] shadow-sm'>Log In</button>
                    </form>

                    <div>
                        <div className='w-full flex justify-between py-3 text-sm'>
                            <p><input className='mr-1' type="checkbox"/> Remember me</p>
                            <p>Need Help?</p>
                        </div>

                        <div className='flex gap-2'>
                            <p>New in here?</p>
                            <Link className='underline' to='/signup'>
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </>
  )
}

