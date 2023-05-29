import { useParams } from "react-router-dom"; //use params giups ta lấy được các biến ở đưuòng dẫn
import { useSelector,useDispatch } from "react-redux";

import { DetailsHeader,Error,Loader,RelatedSongs } from "../components";
import { setActiveSong,playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";
const SongDetails = () =>{
    const handlePlayClick= (song,i) => {
        dispatch(setActiveSong({song,data,i}))
        // khi ấn nút play thì sẽ gán setActiveSong từ đó setActiveSong sẽ trở thành true và player hiện ra
        dispatch(playPause(true))
        //khi ấn nút play thì cũng đồng thời gán cho playpause giá trị bằng true để player chạy
      }
    const handlePauseClick = () =>{
        dispatch(playPause(false))
        //khi ấn pause thì gán playpause giá trị bằng false thì player sẽ dừng
    }
    const dispatch=useDispatch();
    const {songid}=useParams();
    const {data,isFetching: isFetchingRelatedSongs, error}=useGetSongRelatedQuery(songid)
    const {activeSong,isPlaying}=useSelector((state)=>state.player)
    const {data: songData ,isFetching: isFetchingSongDetails } =useGetSongDetailsQuery(songid)
    if (isFetchingSongDetails || isFetchingRelatedSongs) return (<Loader title={"Searching song detail..."}/>)
    if(error) return <Error/>
    return (
        <div className="flex flex-col">
            <DetailsHeader artistId='' songData={songData}/>
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
            </div>
            <div className="mt-5">
                {songData?.sections[1].type === 'LYRICS' ?songData.sections[1].text.map((line,i)=>(
                    <p className="text-gray-400 text-base my-1">{line}</p>
                )):( <p className="text-gray-400 text-base my-1">No lyrics found</p> )}
                
            </div>
            <RelatedSongs
                data={data}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePauseClick={handlePauseClick}
                handlePlayClick={handlePlayClick}
            />
        </div>
    )
}

export default SongDetails;
