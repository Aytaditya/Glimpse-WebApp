import './App.css';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';


function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen items-center mt-5 text-slate-300">
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
      </div>

    </>
  );
}

export default App;
