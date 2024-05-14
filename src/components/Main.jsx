import { useEffect, useState } from "react"
import axios from 'axios';
import { MovieCard } from "./MovieCard";


export const Main = () => {

    const API_URL = 'https://api.themoviedb.org/3';
    const [movies, setMovies] = useState([]);

    //=================================================
    const fetchMovies = async () => {

        const {data: {results}} = await axios.get(`${API_URL}/movie/upcoming?language=FR&page=1`, {
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


    //=================================================
  return (
    <>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 mt-10">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
        
    </>
  )
}
