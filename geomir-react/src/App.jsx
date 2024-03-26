import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import regenatorRuntime from 'regenerator-runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { UserContext } from "./userContext";
import Header from './Layout/Header';
import NotFound from './NotFound';
import Posts from './Posts';
import Places from './Places';
import LoginRegister from './auth/LoginRegister';
import Footer from './Layout/Footer';
import About from './About';
import Post from './posts/Post';
import PostEdit from './posts/PostEdit';
import PostAdd from './posts/PostAdd';
import PostsGrid from './posts/PostsGrid';
import PostsList from './posts/PostsList';
import "leaflet/dist/leaflet.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.scss';
import Place from './places/Place';
import PlaceAdd from './places/PlaceAdd';
import PlaceEdit from './places/PlaceEdit';
import PlacesGrid from './places/PlacesGrid';
import PlacesList from './places/PlacesList';
import PlacesMenu from './places/PlacesMenu';
import PostsMenu from './posts/PostsMenu';
import Contact from './contact/Contact';
import Map from './contact/Map';
import MapAdria from './contact/MapAdria';
import MapIzan from './contact/MapIzan';
import ContactForm from './ContactForm';

export default function App() {
  let [authToken, setAuthToken] = useState(JSON.parse(localStorage.getItem("authToken")) || "");
  // const [scrollDirection, setScrollDirection] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    const handleCommands = () => {
      if (transcript) {
        const command = transcript.toLowerCase();
        switch (command) {
          case 'sube':
            window.scrollBy(0, -300);
            break;
          case 'baja':
            window.scrollBy(0, 300);
            break;
          case 'cerca':
            document.body.style.zoom = '110%';
            break;
          case 'lejos':
            document.body.style.zoom = '90%';
            break;
          default:
            break;
        }
        resetTranscript();
      }
    };

    handleCommands();
  }, [transcript, resetTranscript]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening(); 
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'r') { 
        document.body.style.zoom = '100%'; 
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <UserContext.Provider value={{ authToken, setAuthToken }}>
        {authToken ? (
          <>
            <Header />
            <div className="App">
              <button onClick={startListening}>Iniciar reconocimiento</button>
              <button onClick={stopListening}>Detener reconocimiento</button>
            </div>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/contact/form" element={<ContactForm/>} />
              <Route path="/" element={<><PostsMenu /><PostsGrid /></>} />
              <Route path="/contact" element={<><Contact /><Map /></>} /> {/*ruta provisional */}
              <Route path="/posts/add" element={<><PostsMenu /><PostAdd /></>} />
              <Route path="/posts/grid" element={<><PostsMenu /><PostsGrid /></>} />
              <Route path="/posts/list" element={<><PostsMenu /><PostsList /></>} />
              <Route path="/posts/edit/:id" element={<><PostsMenu /><PostEdit /></>} />
              <Route path="/posts/:id" element={<> <PostsMenu /><Post /></>} />
              <Route path="/places" element={<><PlacesMenu /><PlacesGrid /></>} />
              <Route path="/places/add" element={<><PlacesMenu /><PlaceAdd /></>} />
              <Route path="/places/grid" element={<><PlacesMenu /><PlacesGrid /></>} />
              <Route path="/places/list" element={<><PlacesMenu /><PlacesList /></>} />
              <Route path="/places/:id" element={<><PlacesMenu /><Place /></>} />
              <Route path="/places/edit/:id" element={<><PlacesMenu /><PlaceEdit /></>} />
              <Route path="/mapIzan" element={<MapIzan />} /> {/* ELIMINAR */}
              <Route path="/mapAdria" element={<MapAdria />} /> {/* ELIMINAR */}
              <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <LoginRegister />
        )}
      </UserContext.Provider>
    </>
  );
}
