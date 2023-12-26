import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";
import { MdOutlinePlayCircleFilled } from "react-icons/md"
import { MdOutlinePauseCircleFilled } from "react-icons/md"
import { MdVolumeUp } from "react-icons/md";

export default function Footer() {
    const {Theme, audioDataState: [audioData], playState: [playState, setPlayState], volume: [volume, setVolume], interact: [,setHasInteract]} = useContext(AppContext);
    const audioRef = useRef(null);

    useEffect(() => {
        playState ? audioRef.current.play() : audioRef.current.pause();
        audioRef.current.volume = volume;
    }, [playState, volume])
    function handlePlay() {
        setHasInteract(true);
        setVolume(0.5);
        setPlayState(true);
    }
    function handlePause() {
        setVolume(0);
        setPlayState(false);
    }

    function handleVolumeChange(e) {
        setVolume(e.target.value)
    }

    return (
        <footer className={Theme === true ? 'footer-light' : 'footer-dark'}>
            
            <MdOutlinePlayCircleFilled data-active={playState} onClick={handlePlay} title="play" role="button" aria-label="Play" />
            <MdOutlinePauseCircleFilled data-active={!playState} onClick={handlePause} title="pause" role="button" aria-label="Pause" />
            <div className="volume">
                <MdVolumeUp title="volume" role="button" aria-label="Volume control" className="volume" />
                <input onChange={handleVolumeChange} type='range' min={0} max={1} step={0.05} value={volume} />
            </div>

            <audio crossOrigin="anonymous" src={audioData.url} ref={audioRef}></audio>
        </footer>
    )
}