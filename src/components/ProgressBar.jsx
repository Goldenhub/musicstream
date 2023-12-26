import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

export default function ProgressBar() {
    const { audioDataState: [audioData] } = useContext(AppContext);
    const [progressVal, setProgressVal] = useState(parseInt(((new Date().valueOf() - audioData.songStartedAt) / 1000).toFixed(2)))

    useEffect(() => {
        const startTime = () => {
            let progressVal = parseInt(((new Date().valueOf() - audioData.songStartedAt) / 1000).toFixed(2))
            setProgressVal(progressVal);
        }
        let timer = setInterval(function () {
            startTime();
        }, 100);

        return () => {
            clearInterval(timer);
        }
    }, [audioData.songStartedAt])


    return (
        <section className="progressBar">
            <progress aria-label="track progress" value={progressVal} max={audioData.songDuration} step={1}></progress>
        </section>
    )
}