import './App.css';
import Navbar from './components/Navbar';
import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';


function App() {
  return (
    <div className="bg-slate-900 h-full w-full overflow-x-auto overflow-y-hidden">
      <Navbar />
      <div className="flex flex-col w-screen items-center mt-5 text-slate-300 ">
        <VideoPlayer />
        <Notifications/>
        <Options/>
       
          
        
      </div>

    </div>
  );
}

export default App;
