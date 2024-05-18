import React, { useEffect, useState } from 'react'
import { UserAuth } from '../context/AuthContext';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

export const MovieDBCard = ({movie}) => {

    const { userDB,saveMovie, deleteMovie } = UserAuth();
    const [like, setLike] = useState(false);
  
    const handleLike = (movie)  => {
      saveMovie(movie)
      setLike(true)
    }
  
    const handleDislike = (movieId) => {
      deleteMovie(movieId)
      setLike(false)
    }
  
    useEffect(() => {
      const array = userDB?.filter(mov => (
        mov.id === movie.id
      ))
    
      if(typeof(array) !== 'undefined' && array.length > 0) {
        setLike(true)
      } else {
        setLike(false)
      }
    }, [like, userDB, movie.id])


  return (
    <div className='min-h-[180px] cursor-pointer rounded-xl relative shadow-black shadow-lg'>
        <div className='absolute rounded-tl-xl rounded-br-3xl bg-slate-900 opacity-70 text-white hover:opacity-100 p-3'>
                <IoMdClose onClick={() => handleDislike(movie.id)} className='' />
        </div>
        <img className='rounded-xl h-full object-cover' src={`https://image.tmdb.org/t/p/original${movie.img}`} alt={movie.title} />
        {/* <h3 className='text-white bg-black/70 absolute bottom-0 left-0 w-full h-[30%]'>{movie.title}</h3>  */}
        <Link to={`/browse/movie/${movie.id}`}>
            <button className='text-sm text-white bg-black/70 rounded-b-xl absolute bottom-0 left-0 w-full h-[40%] px-2 overflow-scroll'>{movie.title}</button>
        </Link>
    </div>
  )
}
