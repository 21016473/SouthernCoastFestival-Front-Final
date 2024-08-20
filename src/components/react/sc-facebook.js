import React, { useEffect } from 'react'

const FacebookShareButton = ({ url }) => {
    useEffect(() => {
        // Initialise Facebook SDK after the component is mounted
        if (window.FB) {
            window.FB.XFBML.parse()
        }
    }, [])

    return (
        <div 
            className="fb-share-button"
            data-href={url}
            data-layout="button_count"
        ></div>
    )
}

export default FacebookShareButton;