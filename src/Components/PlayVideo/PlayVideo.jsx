import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import user_profile from '../../assets/user_profile.jpg'
import jack from '../../assets/jack.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'
import { useParams } from 'react-router-dom'

const PlayVideo = () => {
    const {videoId}=useParams()
    const [apiData, setApiData] = useState(null)
    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState()
    // fetching video data

    const fetchVideoData = async () => {
        const video_details_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
        try {
            const res = await fetch(video_details_url)
            const response = await res.json()
            setApiData(response.items[0])

        } catch (error) {
            console.log(error)
        }
    }

    // fetching channel data
    // const fetchChannelData = async () => {
    //     const channel_details_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
    //     try {
    //         const res = await fetch(channel_details_url)
    //         const response = await res.json()
    //         setCommentData(response.items)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    // fetching comment data

    const fetchCommentData = async () => {
        const comment_details_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
        try {
            const res = await fetch(comment_details_url)
            const response = await res.json()
            setCommentData(response.items)
        } catch (error) {
            console.log(error)
        }
    }
  

    useEffect(() => {
        fetchVideoData()
        fetchCommentData()


    }, [videoId])

    // useEffect(() => {
    //     fetchChannelData()


    // }, [apiData])


    return (
        <div className='play-video'>
            {/* <video src={video1} autoPlay loop controls muted></video> */}
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <h3>{apiData?.snippet.localized.title}</h3>
            <div className="play-video-info">
                <p>{value_converter(apiData?.statistics.viewCount)} Views &bull;  {moment(apiData?.snippet.publishedAt).fromNow()} </p>
                <div>
                    <span><img src={like} alt="" /> {value_converter(apiData?.statistics.likeCount)}</span>
                    <span><img src={dislike} alt="" /> 12 </span>
                    <span><img src={share} alt="" /> 15 </span>
                    <span><img src={save} alt="" /> 125 </span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={jack} alt="" />
                <div>
                    <p>{apiData?.snippet.channelTitle}</p>
                    <span>1M Subcribers</span>
                </div>
                <button>Subcribers</button>
            </div>
            <div className="vid-description">
                <p>{apiData?.snippet.description.slice(0, 250)}</p>
                <hr />
                <h4>{value_converter(apiData?.statistics.commentCount)} Comments</h4>


                {
                    commentData && commentData.map((item, index) => (
                        
                        <div className="comment">
                            <img src={(item.snippet.topLevelComment.snippet.authorProfileImageUrl)?item.snippet.topLevelComment.snippet.authorProfileImageUrl:user_profile} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    ))
                   }






            </div>
        </div>
    )
}

export default PlayVideo