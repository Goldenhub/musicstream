import { useContext } from "react";
import { AppContext } from "../App";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdHistory } from "react-icons/md";


export default function Header() {
    const {Theme, handleClick, offCanvasVisibility: [, setOffCanvasVisibility]} = useContext(AppContext);

    function handleOffCanvasToggle(){
        setOffCanvasVisibility(prev => !prev);
    }

    return (
        <header className={Theme === true ? 'header-light' : 'header-dark'}>
            <h1>musiqstream</h1>
            <div>
                <MdHistory onClick={handleOffCanvasToggle} title="history" role="button" aria-label="History" />
                <MdOutlineDarkMode onClick={handleClick} data-active={Theme} title="dark mode" role="button" aria-label="dark mode" />
                <MdOutlineLightMode onClick={handleClick} data-active={!Theme} title="light mode" role="button" aria-label="light mode" />
            </div>
        </header>
    )
}