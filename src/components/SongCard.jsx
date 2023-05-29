import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import PlayPause from "./PlayPause";
import { playPause,setActiveSong } from "../redux/features/playerSlice";
const SongCard = ({song,isPlaying,activeSong,data,i}) => {
  const dispatch= useDispatch()
  const handlePlayClick= () => {
    dispatch(setActiveSong({song,data,i}))
    // khi ấn nút play thì sẽ gán setActiveSong từ đó setActiveSong sẽ trở thành true và player hiện ra
    dispatch(playPause(true))
    //khi ấn nút play thì cũng đồng thời gán cho playpause giá trị bằng true để player chạy
  }
  const handlePauseClick = () =>{
    dispatch(playPause(false))
    //khi ấn pause thì gán playpause giá trị bằng false thì player sẽ dừng
  }
  return (
  <div className="flex flex-col w-[250px] p-4
  bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg
  cursor-pointer">
    <div className="relative w-full h-56 group ">
      <div
      className={`absolute inset-0 justify-center items-center bg-black
      bg-opacity-50 group-hover:flex ${activeSong?.title=== song.title ?'flex bg-black bg-opacity-70' :'hidden'}`}
      >
      <PlayPause
        song={song}
        isPlaying={isPlaying}
        activeSong ={activeSong}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
      {/* cái bên trên là để set hiển thị bình thường thì opacity sẽ bị ẩn đi, khi hover vào thì hidden sẽ chuyển thành flex và khi play thì sẽ chuyển thành tối hơn kiểu highlight bài nào đang chạy */}
      </div>
      <img src={song.images?.coverart} alt="song_img" />
    </div> 
    {/* // cái div này là để chứa ảnh */}
    <div className="mt-4 flex flex-col">
      <p className="font-semibold text-lg text-white truncate" >
        {/* nếu text dài quá thì truncate sẽ làm nhiệm vụ cắt bớt đi */}
        <Link to={`/songs/${song?.key}`}>
          {song.title}
        </Link>
      </p>
      <p className="text-sm truncate text-gray-300 mt-1">
        <Link to={song.artists? `/artists/${song?.artists[0]?.adamid}`:'/top-artists'}>
          {song.subtitle}
        </Link>
      </p>
    </div>

  </div>
  )
};

export default SongCard;
