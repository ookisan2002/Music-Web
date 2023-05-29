import { useState,useEffect } from "react";
import axios, { Axios } from "axios";
import { useSelector } from "react-redux";

import {Error, Loader ,SongCard} from'../components'
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";
const CountryTracks = () =>{
    const [country,setCountry] = useState('VN');
    const [loading,setLoading] = useState(true);
    const {activeSong, isPlaying} = useSelector((state)=> state.player)
    useEffect(() =>{
        //at_42r5wBqF4sYCVez6D2aI9z3d0mr8O
        axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_42r5wBqF4sYCVez6D2aI9z3d0mr8O')
        .then((res)=> setCountry(res?.data?.location?.country))
        .catch((err)=> console.error(err))
        .finally(()=> setLoading(false));
    },[country])
    const {data,isFetching,error} =useGetSongsByCountryQuery(country)
    
    if(isFetching||loading) return <Loader title='Loading songs...'/>;
    if (error && country) return <Error/>
    console.log(error);
    console.log(country);
    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Arround you</h2>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song,i)=>(
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

export default CountryTracks;
