import * as React from 'react'
import { FaPlay, FaPause } from 'react-icons/fa6'
import { PauseCircle, PlayCircle } from '@mui/icons-material'

const VideoControlButton = ({ isPlaying, onClick }) => (
    <button className="video-control" onClick={onClick}>
        {isPlaying ? <PauseCircle /> : <PlayCircle /> }
    </button>
)

export default VideoControlButton;