import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'

const VideoControlButton = ({ isPlaying, onClick }) => (
    <button className="video-control" onClick={onClick}>
        {isPlaying ? {faPause} : {faPlay} }
    </button>
)

export default VideoControlButton;