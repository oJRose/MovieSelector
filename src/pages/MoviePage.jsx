import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {CastMemberCard} from '../components/CastMemberCard'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, collection, doc, getDoc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase';


export const MoviePage = () => {

    const API_URL = 'https://api.themoviedb.org/3';
    const API_KEY = process.env.REACT_APP_MOVIE_DB_API_KEY;
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState({});
    const params = useParams();
    const movieID = parseInt(params.movieID);

    //====
    const { user, userDB, saveMovie,  deleteMovie } = UserAuth();
  
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
        mov.id === movieID
      ))
    
      if(typeof(array) !== 'undefined' && array.length > 0) {
        setLike(true)
      } else {
        setLike(false)
      }
    }, [like, userDB, user, movieID])
  
  

    //====

    const apiCall = async () => {
        await axios.get(`${API_URL}/movie/${movieID}?api_key=${API_KEY}`)
        .then((response) => {
            setMovie(response.data)
        })
    }

    const getCredits = async() => {
        await axios.get(`${API_URL}/movie/${movieID}/credits?api_key=${API_KEY}`)
        .then((response) => {
            setCredits(response.data)
        })
    }

    useEffect(() => {
        apiCall()
        getCredits()
    }, [user, params])

  return (

    <>
    <div className='w-full  relative'>

        <img className='fixed h-[100%] w-full object-cover top-0 left-0 opacity-10' src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt="" />

        <div className='w-full max-w-[1100px] m-auto pt-[60px] grid grid-cols-1 sm:grid-cols-2  gap-10 p-7'>

        <div className='z-40'>
            <img className='rounded-xl w-[300px] h-[450px] object-cover m-auto block' src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
        </div>

        <div className=' flex flex-col content-between z-40'>
            <div>
                <h1 className='text-3xl'>{movie.title}</h1>
                <h4>{movie.release_date}</h4>
                <div className='flex gap-4'>
                    {movie.genres?.map((genre) => (
                        <p className='' key={genre.id}>{genre.name}</p>
                    ))}
                </div>
            </div>

            <div className='flex items-center gap-4 pt-4'>
                <p>Add To A list</p>
                <div className='bg-black rounded-full font-bold p-5 cursor-pointer'>
                    <FaListUl />
                </div>
                <p>Or</p>
                <div className='bg-black rounded-full p-5 cursor-pointer'>
                    {like ? 
                        <FaHeart onClick={() => handleDislike(movie.id)} className='' />
                    :
                        <FaRegHeart onClick={() => handleLike(movie)} className='' />
                    }
                </div>
            </div>

            <div className=' w-full h-full mt-5 border-red-900'>
                <h3 className='text-2xl mb-4'>Synopsis:</h3>
                <p className=''>{movie.overview}</p>

                <div className='text-sm flex justify-between mt-7'>
                    <div className='m-1'>
                        <h4 className='underline'>Director</h4>
                        {credits.crew?.filter(obj => obj.job === 'Director').map(filteredJobs => (
                            <p key={filteredJobs.id}>{filteredJobs.name}</p>
                        ))}
                    </div>

                    <div className='m-1'>
                        <h4 className='underline'>Director of Photography</h4>
                        {credits.crew?.filter(obj => obj.job === 'Director of Photography').map(filteredJobs => (
                            <p key={filteredJobs.id}>{filteredJobs.name}</p>
                        ))}
                    </div>

                    <div className='m-1'>
                        <h4 className='underline'>Screenplay</h4>
                        {credits.crew?.filter(obj => obj.job === 'Screenplay').map(filteredJobs => (
                            <p key={filteredJobs.id}>{filteredJobs.name}</p>
                        ))}
                    </div>
                </div>
            </div>

        </div>

        <div className='border-b'>
            <h3 className='pb-4 text-xl'>Cast Members:</h3>
        </div>
        <div className='sm:col-span-2 md:col-span-2 w-full h-[200px] p-2 flex overflow-x-scroll whitespace-nowrap scrollbar-hide'>
            {credits.cast?.map((member, id) => (
                <CastMemberCard key={id} castMember={member} />
            ))}
        </div>
        </div>

    </div>
    
    </>
  )
}
