import React, {Component} from 'react';
import shaka from 'shaka-player';

class VideoPlayer extends Component {

    constructor(props){

        super(props);


        this.videoComponent = React.createRef();

        this.onErrorEvent = this.onErrorEvent.bind(this);

        this.onError = this.onError.bind(this);
    }

    onErrorEvent(event) {
        // Extract the shaka.util.Error object from the event.
        this.onError(event.detail);
    }

    onError(error) {
        // Log the error.
        console.error('Error code', error.code, 'object', error);
    }

    componentDidMount(){

        let manifestUri = this.props.videoUrl;

        console.log(manifestUri)

        let licenseToken = this.props.licenseToken

        const video = this.videoComponent.current;

        shaka.polyfill.installAll();

        let player = new shaka.Player(video);

        // Attach player to the window to make it easy to access in the JS console.
        window.player = player;

        // Listen for error events.
        player.addEventListener('error', this.onErrorEvent);

        // Configure Axinom DRM license services.
        player.configure({
            drm: {
                servers: {
                    'com.widevine.alpha': 'https://drm-widevine-licensing.axtest.net/AcquireLicense',
                    'com.microsoft.playready': 'https://drm-playready-licensing.axtest.net/AcquireLicense',
                    'com.apple.fps.1_0': 'https://drm-fairplay-licensing.axtest.net/AcquireLicense'
                },

                // By default, Shaka Player does extra base64 transformations to FairPlay license
                // requests and responses. Our FairPlay license services expects to receive and sends
                // plain unprocessed binary data. Setting "fairPlayTransform" to "false" achieves this.
                //fairPlayTransform: false
            }
        });

        // Add the "X-AxDRM-Message" header, containing the license token, to the header
        // of all license requests.
        player.getNetworkingEngine().registerRequestFilter(function(type, request) {
            if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
                // This is the specific header name and value the server wants:
                request.headers['X-AxDRM-Message'] = licenseToken;
            }

        });

        // Try to load a manifest.
        // This is an asynchronous process.
        player.load(manifestUri).then(function() {
            // This runs if the asynchronous load is successful.
            console.log('The video has now been loaded!');

        }).catch(this.onError);  // onError is executed if the asynchronous load fails.

    }

    render(){

        return(
            <video
                width="640"
                height="480"
                ref={this.videoComponent}
                controls
            />
        );
    }
}

export default VideoPlayer;