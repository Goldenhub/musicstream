import { useContext } from "react";
import { AppContext } from "../App";
import dummy from '../assets/dummy_cover.svg'

export default function TrackCover() {
    const { audioDataState: [audioData], playState: [playState] } = useContext(AppContext);
    const imgUrl = audioData.currentSong.art ?? dummy;
    return (
        <>
            {playState ?
                <img src={imgUrl} alt="track cover" />
                : <img src={dummy} alt="track cover" />
            }
        </>
    )
}