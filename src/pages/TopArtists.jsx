import { useSelector } from "react-redux";

import { Error, Loader, ArtistCard } from '../components'
import { useGetTopChartsQuery } from "../redux/services/shazamCore";


const TopArtists = () => {
    const { data, isFetching, error } = useGetTopChartsQuery()

    if (isFetching) return <Loader title='Loading songs...' />;
    if (error) return <Error />
    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top charts artists</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((track, i) => (
                    <ArtistCard
                        key={track.key} //song key là để biết được bài nào đang chạy rồi lấy key để truy xuất detail và related tracks
                        track={track} //gắn thực thể song vào trong các song card
                        data={data} //
                        i={i}
                    // index để biết được đang ở bài nào còn next
                    />
                ))}
            </div>
        </div>
    )
}

export default TopArtists;
