import { useContext } from "react";
import { AppContext } from "../App";
import dummy from '../assets/dummy_cover.svg'

export default function TrackCover() {
    const {audioDataState: [audioData]} = useContext(AppContext);
    const imgUrl = audioData.currentSong.art ?? dummy;
    return (
        <img src={imgUrl} alt="track cover" />
    )
}