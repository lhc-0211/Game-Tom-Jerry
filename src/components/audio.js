import React, { useEffect, useRef, useState } from 'react';
import audioFile from '../assets/music/57628201b49a23075b51c411e60ebccd.mp3';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(new Audio(audioFile));

    const startAudio = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const toggleAudio = () => {
        if (isPlaying) {
            // Tạm dừng thể hiện hiện tại
            audioRef.current.pause();
        } else {
            // Bắt đầu phát lại thể hiện
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <button
                className='btn-audio'
                onClick={toggleAudio}>
                {isPlaying ? 'Tắt âm' : 'Bật âm'}
            </button>

            <audio controls hidden>
                <source src={audioFile} type="audio/mp3" />
            </audio>
        </div>
    );
};

export default AudioPlayer;
