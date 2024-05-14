
export const CastMemberCard = ({castMember}) => {

  return (
    <div className='bg-blue-600 flex-none w-[100px] m-2 h-[150px] cursor-pointer rounded-xl relative'>
        <img className="rounded-xl" src={`https://image.tmdb.org/t/p/w300/${castMember.profile_path}`} alt={castMember.title} />
        <div className="bg-black/70 absolute rounded-b-xl bottom-0 left-0 w-full h-[40%]">
            <h5 className="font-bold text-wrap text-sm">{castMember.character}</h5>
            <p className='text-xs text-wrap'>{castMember.name}</p> 
        </div>
    </div>
  )
}