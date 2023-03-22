import './App.css';
import Map from './components/Map';
import { useState } from "react";
import Babylon from './components/Babylon';

function App() {
  const [imgUrl, setImgUrl] = useState("");
  const [showCuboid, setShowCuboid] = useState(false);

  const handleCapture = (imgUrl) => {
    setImgUrl(imgUrl);
    setShowCuboid(true);
  }

  const handleBack = () => {
    setImgUrl("");
    setShowCuboid(false);
  }

  return (
    <div className="App">
      {!showCuboid && <Map handleCapture={handleCapture}/>}
      {showCuboid && <Babylon imgUrl = {imgUrl} handleBack={handleBack}/>}
    </div>
  );
}

export default App;
