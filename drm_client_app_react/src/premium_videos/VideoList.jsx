import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { videoService } from '@/_services';


function Premium({match}) {

    const {path} = match

    const [videos, setVideos] = useState([])

    useEffect(() => {
        videoService.getPremium().then(x => setVideos(x))
    }, [])
    
    return (
        
        <div className="p-4">
            <div className="container">
                <h1>Available premium videos:</h1>
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

export { Premium };