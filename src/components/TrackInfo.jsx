import { useContext } from "react";
import { AppContext } from "../App";
import { MdHeadset } from "react-icons/md";

export default function TrackInfo(){
    const {audioDataState: [audioData]} = useContext(AppContext);
    return (
        <section className="trackInfo">
            <span>Title</span>
            <h2 className="title">{audioData.currentSong.title}</h2>
            <span>Artist</span>
            <h3 className="artist">{audioData.currentSong.artist}</h3>
            <h4 title="listeners"><MdHeadset /> {audioData.listeners}</h4>
        </section>
    )
}