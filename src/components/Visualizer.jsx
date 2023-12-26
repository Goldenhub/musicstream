import { useEffect, useRef } from "react"
import { useContext } from "react";
import { AppContext } from "../App";

/* eslint-disable react/prop-types */
export default function Visualizer({ children }) {
    const { audioDataState: [audioData] } = useContext(AppContext);
    const canvasRef = useRef(null)
    const audioRef = useRef(null)
    const audioSrc = useRef(null)
    const analyser = useRef(null)

    useEffect(() => {

        if (!audioSrc.current) {
            audioRef.current = new AudioContext();
            analyser.current = audioRef.current.createAnalyser();
            const audio = document.getElementsByTagName('audio')[0];
            audioSrc.current = audioRef.current.createMediaElementSource(audio);
            audioSrc.current.crossOrigin = "anonymous";
            audioSrc.current.connect(analyser.current);
            audioSrc.current.connect(audioRef.current.destination)
            analyser.current.connect(audioRef.current.destination)
        }
        const canvas = canvasRef.current;
        
        if(window.matchMedia("(max-width: 700px)").matches){
            canvas.width = '300';
            canvas.height = '100';
        }else{
            canvas.width = '600';
            canvas.height = '200';
        }
        const ctx = canvas.getContext('2d');

        analyser.current.fftSize = 256;
        const bufferLength = analyser.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        // eslint-disable-next-line no-inner-declarations
        function draw() {
            requestAnimationFrame(draw);

            analyser.current.getByteFrequencyData(dataArray);

            ctx.fillStyle = "rgb(0, 128, 128)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            const barWidth = (canvas.width / bufferLength) * 2.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = dataArray[i];

                ctx.fillStyle = `rgb(${barHeight + 100}, 128, 128)`;
                ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

                x += barWidth + 1;
            }
        }
        draw();

        return () => {
            console.log('yes')
        }
    }, [audioData.url])

    return (
        <section className="visualizer">
            {children}
            <canvas ref={canvasRef}>
            </canvas>
        </section>
    )
}

