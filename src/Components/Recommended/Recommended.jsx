import React, { useEffect, useState } from 'react'
import './Recommended.css'
import { API_KEY, value_converter } from '../../data.js'
import { Link } from 'react-router-dom'

const Recommended = ({ categoryId }) => {

    const [apiData, setApiData] = useState([])
    const fetchData = async () => {
        const recommended_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=${categoryId}&key=${API_KEY}`

        const res = await fetch(recommended_url)
        const response = await res.json()
        setApiData(response.items)
    }

    console.log(apiData)

    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div className='recommended'>
            {
                apiData && apiData.map((item, index) => (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
                        <img src={item.snippet.thumbnails.standard.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>
                ))
            }


        </div>
    )
}

export default Recommended