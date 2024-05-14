import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import { UserAuth } from '../context/AuthContext'
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";

export const Navbar = () => {

  const navigate = useNavigate()
  const {user, logOut} = UserAuth()

  const handleLogOut = async () => {
    try {
      await logOut()
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
        <header className='my-10 w-full h-[85px] flex justify-between items-center p-3 sm:p-5 border-black border-y-2 relative z-40'>



            <Link to='/browse/search'>
              <button className='text-xs flex items-center gap-3 border border-black rounded-full p-3'><IoSearch/> Search</button>
            </Link>

            <Link to='/'>
              <h1 className='cursor-pointer'>TatTwamAsi.</h1>
            </Link>

            {user ? (
              <div className='flex items-center gap-3'>
                  <Link to='/account' >
                    <VscAccount size={'30px'} className='text-red-400 ml-2' />
                  </Link>
                  
                  <button 
                        onClick={handleLogOut}
                        className=' border border-black rounded-full  p-1 sm:p-3 sm:ml-3'>Log Out</button>
                  
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                  <Link to='/login' >
                    <button>Log In</button>
                  </Link>
                  <Link to='/signup' >
                    <button className='border border-black rounded-full hover:shadow-lg shadow-black p-1 sm:p-3 sm:ml-3'>Sign Up</button>
                  </Link>
              </div>
            )}
        </header>
    </>
  )
}
