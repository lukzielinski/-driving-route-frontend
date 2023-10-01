import { useEffect, useState } from "react";
import Loader from './components/Loader/Loader';
import './App.css';
import Sidebar from "./modules/sidebar/Sidebar";
import { Coordinates } from "./Types/Coordinates";
import Map from "./modules/map/Map";

function App() {
  const [coordinates, setBackendData] = useState<Coordinates[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setBackendData(data);
        setIsLoading(false);
      });
  }, []);


  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="main-elements">
          <Map coordinates={coordinates} />
          <Sidebar coordinates={coordinates} />
        </div>
      )}
    </div>
  );
}

export default App;