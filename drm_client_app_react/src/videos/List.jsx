import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { videoService } from '@/_services';


function List({match}) {

    const {path} = match
    let isSafariDetected = false;

    const [videos, setVideos] = useState([])

    // Detect if we are using Safari. If yes, then only FairPlay is supported and we'll
    // activate FairPlay-specific workflows. This means that, we will:

    if (typeof WebKitMediaKeys === "function" && WebKitMediaKeys.isTypeSupported("com.apple.fps.1_0", "video/mp4"))
    {
        isSafariDetected = true;
    }

    useEffect(() => {
        videoService.getFree().then(x => filterVideos(x))
    }, [])

    function filterVideos(videos) {
        const newVideos = videos.filter(function (video) {
            if (video.tags){
                if (isSafariDetected)
                     video.tags.forEach(tag => {
                         if (tag.toLowerCase() === 'fairplay')
                             return true
                })
                else {
                    video.tags.forEach(tag => {
                        if (tag.toLowerCase() === 'fairplay') {
                            return false
                        }

                    })
                }
            }
            else return true;
        })
        setVideos(newVideos)
    }


    return (

        <div className="p-4">
            <div className="container">
                <h1>Available videos:</h1>
                <ul>
                    {videos && videos.map((item, index) =>
                        <div key={index}>
                            <Link to={`${path}/view/${item.name}`}>{item.name}</Link>
                        </div>

                    )}
                    {!videos &&
                    <tr>
                        <td colSpan="4" className="text-center">
                            <span className="spinner-border spinner-border-lg align-center"></span>
                        </td>
                    </tr>
                    }
                </ul>
            </div>
        </div>
    );
}

export { List };