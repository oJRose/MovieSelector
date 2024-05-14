
import { useEffect, useState } from "react"
import axios from 'axios';
import { Movie } from "./Movie";


export const Main = () => {

    const API_URL = 'https://api.themoviedb.org/3';
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');

    //=================================================
    const fetchMovies = async (searchKey) => {

        const type = searchKey ? 'search' : 'discover';

        const {data: {results}} = await axios.get(`${API_URL}/${type}/movie`, {
            params: {
                api_key: process.env.REACT_APP_MOVIE_DB_API_KEY,
                query: searchKey
            }
        })
        setMovies(results)
        console.log(results)
    }

    //=================================================
    useEffect(() => {
        fetchMovies()
    }, [])

    //=================================================
    const searchMovies = (e) => {
        e.preventDefault();
        fetchMovies(searchKey)
    }




  return (
    <>
        {/* <Searchbar /> */}

        <div className='w-full h-[400px] p-5 flex justify-center items-center'>
            <form onSubmit={searchMovies}>
                <input
                    className='text-black'
                    onChange={(e) => setSearchKey(e.target.value)}
                    type="text" />
                <button type='submit'>Search!</button>
            </form>
        </div>


        <div className="flex flex-wrap justify-center items-center w-full p-5">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} />
            ))}
        </div>
        
    </>
  )
}
