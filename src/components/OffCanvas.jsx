import { useContext } from "react";
import { AppContext } from "../App";

export default function OffCanvas() {
    const {audioDataState: [audioData]} = useContext(AppContext);

    const history = audioData.songHistory.map(song => {
        return <li key={song.sh_id}>
            <figure>
                <img src={song.song.art} alt={song.song.text} />
            </figure>
            <p>{song.song.text}</p>
        </li>
    })

    return (
        <aside>
            <ul>
                {history}
            </ul>
        </aside>
    )
}