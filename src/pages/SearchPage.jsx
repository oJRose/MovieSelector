import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Movie, MovieCard } from '../components/MovieCard';

export const SearchPage = () => {

    const API_URL = 'https://api.themoviedb.org/3';
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    const fetchMovies = async (searchKey) => {

        const {data: {results}} = await axios.get(`${API_URL}/search/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
                query: searchKey
            }
        })
        setMovies(results)
    }

    const searchMovies = (e) => {
        e.preventDefault();
        fetchMovies(searchKey)
    }

  return (
    <div className='flex flex-col max-w-[1000px] m-auto p-10 w-full items-center'>
        <form 
            className='pt-[50px] mb-[50px] flex'
            onSubmit={searchMovies}>
            <input
                className='text-gray-700 rounded-xl p-2'
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder='title'
                type="text" />
            <button className='ml-4' type='submit'>Search!</button>
        </form>

        <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 mt-10'>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>

    </div>
  )
}