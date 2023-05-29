import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {Error, Loader ,SongCard} from'../components'
import { useGetSongsBySearchQuery } from "../redux/services/shazamCore";


const Search = () => {
  const {activeSong, isPlaying} = useSelector((state)=> state.player)
  const {searchTerm}=useParams()
  const {data,isFetching,error} =useGetSongsBySearchQuery(searchTerm)
  if(isFetching) return <Loader title='Loading songs...'/>;
  if (error) return <Error/>
  const songs= data?.tracks?.hits?.map((song)=>song.track);
  console.log(songs)
  return (
      <div className="flex flex-col">
          <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top charts songs</h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
              {songs?.map((song,i)=>(
                  <SongCard
                      key={song.key} //song key là để biết được bài nào đang chạy rồi lấy key để truy xuất detail và related tracks
                      song={song} //gắn thực thể song vào trong các song card
                      isPlaying={isPlaying} //
                      activeSong={activeSong} //
                      data={data} //
                      i={i}
                      // index để biết được đang ở bài nào còn next
                  />
              ))}
          </div>
      </div>
  )
}

export default Search;
