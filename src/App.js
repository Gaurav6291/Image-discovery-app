import { useState } from 'react';
import './App.css';
import Api from './components/Api';
import DarkModeToggle from "react-dark-mode-toggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return (
    <div className="App" style={{backgroundColor:isDarkMode?"black":"white", color:isDarkMode?'white':'black'}}>
    <div className="toggleBtn">
        <DarkModeToggle
      onChange={setIsDarkMode}
      checked={isDarkMode}
      size={80}
    />
    </div>
     <Api dark={isDarkMode} />
    </div>
  );
}

export default App;
