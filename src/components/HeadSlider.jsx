import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const HeadSlider = () => {

    const API_URL = 'https://api.themoviedb.org/3';
    const [movies, setMovies] = useState([]);

    //=================================================
    const fetchMovies = async () => {

        const {data: {results}} = await axios.get(`${API_URL}/movie/upcoming?&page=1&append_to_response=credits`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
            }
        })
        setMovies(results)
    }

    //=================================================
    useEffect(() => {
        fetchMovies()
    }, [])

  return (
    <>
        <div className='w-full h-full border border-black p-2 sm:p-7'>
            <div className='w-full h-[calc(100vh-250px)]  flex overflow-x-scroll scroll-smooth snap-x snap-mandatory whitespace-nowrap gap-7 relative rounded-xl shadow-black shadow-md'>
                {movies.map((movie, id) => (
                    <div key={id} className='snap-always snap-center w-full h-full block items-center flex-none cursor-pointer rounded-xl relative shadow-black shadow-md '>
                        <img className='rounded-xl h-full w-full object-cover' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                        {/* <h3 className='text-white bg-black/70 absolute bottom-0 left-0 w-full h-[30%]'>{movie.title}</h3>  */}
                        <Link to={`/browse/movie/${movie.id}`}>
                            <div className='w-[100%] h-full flex items-center p-7  text-white absolute top-[0%] left-[0%] rounded-l-xl bg-gradient-to-r from-gray-950 to-transparent'>
                                <div className=' max-w-[100px] text-wrap'>
                                    <h1 className='text-2xl' >{movie.title}</h1>
                                </div>
                            </div>
                        </Link>

                    </div>

                ))}
            </div>
        </div>
        
    </>
  )
}
