import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import VideoPlayer from './VideoPlayer'


import {videoService} from "@/_services";

function Video({match}) {

    const controllerRef = useRef(null)
    const { path } = match;
    let { id } = useParams()

    const [license, setLicense] = useState(null)
    const [url, setUrl] = useState(null)

    useEffect(() => {
        videoService.getVideoLicense(id).then(x => setLicense(x))
    }, [])


    useEffect(() => {
        videoService.getVideoInfo(id).then(x => setUrl(x.url))
    }, [])

    return (
        <div className="p-4">
            <div className="container">
                <h1>{id}</h1>
                {license && url &&
                    <VideoPlayer licenseToken={license} videoUrl={url} />
                }
                <br></br>
                {!license &&
                    <div>

                    </div>
                }
                <Link to="..">Go Back</Link>
            </div>
        </div>
    );

}

export {Video};