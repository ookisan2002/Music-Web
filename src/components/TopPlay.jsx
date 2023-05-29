import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazamCore";

import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, activeSong, isPlaying, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex
   flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    {'artists' in song &&
      (<>
        <h3 className="font-bold text-base text-white mr-3">{i + 1}</h3>
        <div className="flex-1 flex flex-row justify-between items-center">
          <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
          <div className="flex-1 flex flex-col justify-center mx-3">
            <Link to={`/songs/${song?.key}`}>
              <p className="text-xl font-bold text-white">{song?.title}</p>
            </Link>
            <Link to={`/artists/${song?.artists[0]?.adamid}`}>
              <p className="text-ase font-bold text-gray-300 mt-1">{song?.subtitle}</p>
            </Link>
          </div>
        </div>
        <PlayPause
          isPlaying={isPlaying} //kiểm tra có đang chạy không
          activeSong={activeSong}// bài hát đang chạy 
          song={song}// kiểm tra xem bài này có phải bài đang chạy ko
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)} //do phải truyền vào 1 hàm mà hàm handleplay click lại cần đối số nên ko thể truyền trực tiếp vào được mà cần truyền dưới dạng call
        />
      </>
      )
    }
  </div>
)
const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);
  const topPlays = data?.slice(0, 5);
  // lấy ra 5 bài đầu tiên
  // đối với các tác vụ cần dùng đến fetch thì phải luôn dùng ? bởi có thể gây ra bất đông bộ 
  useEffect(() => { divRef.current.scrollIntoView({ behavior: 'smooth' })})
  //đây chính là phần làm cho mỗi khi trang web có sự thay đổi sẽ bị cuộn lên trên
  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    // khi ấn nút play thì sẽ gán setActiveSong từ đó setActiveSong sẽ trở thành true và player hiện ra
    dispatch(playPause(true))
    //khi ấn nút play thì cũng đồng thời gán cho playpause giá trị bằng true để player chạy
  }
  const handlePauseClick = () => {
    dispatch(playPause(false))
    //khi ấn pause thì gán playpause giá trị bằng false thì player sẽ dừng
  }

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 
    flex-1 xl:max-w-[300px] max-w-full flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Chart</h2>
          <Link to={'/top-charts'}>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to={'/top-artists'}>
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView='auto'
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => {
            return 'artists' in song && (
              <>
                <SwiperSlide
                  key={song.key}
                  style={{ width: '25%', height: 'auto' }}
                  className="shadow-lg rounded-full animate-slideright"
                >

                  {'artists' in song &&
                    (<Link to={`/artists/${song?.artists[0].adamid}`}>
                      <img src={song?.images.background} alt="name"
                        className="rounded-full w-full object-cover" />
                    </Link>)
                  }

                </SwiperSlide>
              </>
            )

          })}
        </Swiper>
      </div>
    </div>
  )
};

export default TopPlay;
