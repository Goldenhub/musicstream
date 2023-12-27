
import './App.css'
import Header from './components/Header'
import Visualizer from './components/Visualizer.jsx'
import TrackCover from './components/TrackCover'
import TrackInfo from './components/TrackInfo'
import ProgressBar from './components/ProgressBar'
import Loader from './components/Loader'
import Footer from './components/Footer'
import OffCanvas from './components/OffCanvas'
import { createContext, useEffect, useState } from 'react'

export const AppContext = createContext(null);

function App() {
  const interact = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [Theme, setTheme] = useState(true)
  const playState = useState(false)
  const audioDataState = useState({
    id: '',
    volume: 0,
    listeners: 0,
    currentSong: {},
    mounts: [],
    songHistory: [],
    songDuration: 0,
    url: '',
    songStartedAt: 0
  });
  const volume = useState(0)
  const [audioData, setAudioData] = audioDataState;
  const offCanvasVisibility = useState(false)
  function handleClick() {
    setTheme(prev => !prev)
  }


  useEffect(() => {

    const evtSource = new EventSource("https://coderadio-admin-v2.freecodecamp.org/api/live/nowplaying/sse?cf_connect=%7B%22subs%22%3A%7B%22station%3Acoderadio%22%3A%7B%7D%2C%22global%3Atime%22%3A%7B%7D%7D%7D");
    evtSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const np = data?.pub?.data?.np || null;
      if (np) {
        setAudioData(prev => {
          return {
            ...prev,
            id: np.now_playing.song.id,
            volume: 0,
            listeners: np.listeners.current,
            currentSong: np.now_playing.song,
            mounts: np.station.mounts,
            songHistory: np.song_history,
            songDuration: np.now_playing.duration,
            url: np.station.listen_url,
            songStartedAt: np.now_playing.played_at * 1000
          }
        })
        setLoading(false)
      }
    };
    evtSource.onerror = (err) => {
      console.error("EventSource failed:", err);
    };
    return () => {
      evtSource.close()
    }
  }, [audioData.id, audioData.url, setAudioData])

  const [offCanvas] = offCanvasVisibility
  const [hasInteracted] = interact;

  return (
    <AppContext.Provider value={{
      Theme,
      handleClick,
      audioDataState,
      playState,
      volume,
      offCanvasVisibility,
      interact
    }}>
      <div className={Theme === true ? 'App App-light' : 'App App-dark'}>
        {offCanvas && <OffCanvas />}
        <Header />
        {isLoading ? <Loader /> :
          <>
            <main>
              {hasInteracted && <Visualizer>
                <TrackCover />
              </Visualizer>}
              <div className={Theme === true ? 'footerContainer footerContainer-light' : 'footerContainer footerContainer-dark'}>
                <TrackInfo />
                <ProgressBar />
                <Footer />
              </div>
            </main>
          </>
        }
      </div>
    </AppContext.Provider>
  )
}

export default App
