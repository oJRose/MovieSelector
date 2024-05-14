import { UserAuth } from '../context/AuthContext'
import { MovieDBCard } from '../components/MovieDBCard';

export const Account = () => {

  const { userDB } = UserAuth();

  return (
    <>
    <div className='p-5'>
      <h1 className='text-2xl underline'>My List: (<span className='text-xs'>{userDB.length} shows</span>)</h1>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7 mt-5 py-6">
            {userDB?.map((movie) => (
                    <MovieDBCard key={movie.id} movie={movie}/>
            ))}
        </div>
    </div>
    </>
  )
}
