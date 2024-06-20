import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { useMenu } from '../../context/MenuContext'
import { API_KEY, value_converter } from '../../data.js'
import moment from 'moment'


const Feed = () => {
    const [data, setData] = useState()
    const { category } = useMenu()


    const fetchData = async () => {
        const videolist_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=Us&videoCategoryId=${category}&key=${API_KEY}`
        try {

            const res = await fetch(videolist_url)
            const response = await res.json()
            setData(response.items)

        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        fetchData()
    }, [category])


    return (
        <>
        <div className="feed">
            {
                data?.map((curData, index) => (

                    <Link to={`video/${curData.snippet.categoryId}/${curData.id}`} className='card' key={index}>
                        <img src={curData.snippet.thumbnails.standard.url} alt="" />
                        <h2>{curData.snippet.title}</h2>
                        <h3>{curData.snippet.channelTitle}</h3>
                        <p>{value_converter(curData.statistics.viewCount)} views &bull;  {moment(curData.snippet.publishedAt).fromNow()} </p>
                    </Link>
                ))
            }

           
        </div>
        <p style={{textAlign:"center",color:"red"}}>Build by Swarnendu Ghosh</p>
        </>
    )
}

export default Feed