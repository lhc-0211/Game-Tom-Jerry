import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StartScreen from './scenes/client/startScreen';
import CharacterSelectionScreen from './scenes/client/characterSelectionScreen';
import CharacterScreen from './scenes/client/characterScreen';
import Win from './scenes/client/winner';
import PlayScreen from './scenes/playScreen';

import AudioPlayer from './components/audio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Sử dụng các biểu tượng Solid
import './App.scss'
library.add(fas); // Thêm các biểu tượng Solid vào thư viện


function App() {
  return (
    <Router>
      <>
        <div className="App"
        >
          <div
            className='container'
            style={{
              padding: '10px'
            }}>

            <Routes>
              <Route path="/player/win" element={<Win />} />
              <Route path="/player/:mode" element={<PlayScreen />} />
              <Route path="/player" element={<CharacterSelectionScreen />} />
              <Route path="/character" element={<CharacterScreen />} />
              <Route path="/" element={<StartScreen />} />
            </Routes>
          </div>


          {/* <AudioPlayer /> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-gear" /> */}
        </div>
      </>

    </Router>
  );
}

export default App;
