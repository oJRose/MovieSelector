import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from '../context/AuthContext';
import { arrayUnion, deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const MovieCard = ({movie}) => {

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
      mov.id === movie.id
    ))
  
    if(typeof(array) !== 'undefined' && array.length > 0) {
      setLike(true)
    } else {
      setLike(false)
    }
  }, [like, userDB, user, movie.id])


  return (
    <div className='max-h-[calc(100vh/2)] w-full cursor-pointer rounded-xl relative shadow-black shadow-md'>
        <div className='absolute rounded-tl-xl rounded-br-3xl bg-slate-900 opacity-80 p-5'>
              {like ? 
                <FaHeart onClick={() => handleDislike(movie.id)} className='' />
              :
                <FaRegHeart onClick={() => handleLike(movie)} className='' />
              }
        </div>
        <img className='rounded-xl h-full w-full object-cover' src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} />
        {/* <h3 className='text-white bg-black/70 absolute bottom-0 left-0 w-full h-[30%]'>{movie.title}</h3>  */}
        <Link to={`/browse/movie/${movie.id}`}>
          <button className='text-white bg-black/70 rounded-b-xl absolute bottom-0 left-0 w-full h-[20%]'>Details</button>
        </Link>
    </div>
  )
}




//   const [like, setLike] = useState(false);

//   const movieRef = doc(db, 'users', `${user?.email}`);
  
//   const saveMovie = async () => {
//     if (user.email) {
//       setLike(!like)
//       await updateDoc(movieRef, {
//         savedMovies: arrayUnion({
//           id: movie.id,
//           title: movie.title,
//           img: movie.backdrop_path
//         })
//       })
//     }
//   }

//   const deleteMovie = async (passedID) => {
//     try {
//         const result = userDB?.filter((item) => item.id !== passedID);
//         console.log(result)
//         await updateDoc(movieRef, {
//             savedMovies: result
//         })
//         setLike(!like)
//     } catch (error) {
//         console.log(error)
//     }
// }
