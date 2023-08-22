"use client"
import axios from "axios";
import logo from './logo.svg';
import './App.css';
import { useEffect,useState } from 'react';
import { Base64, decode } from 'js-base64';

function App() {
  const username = 'rituisboy'
  const filename="index.html"
  const [content,setUser] = useState('')
  const [language,setLanguage] = useState('Select language')
  const [audioPlayed, setAudioPlayed] = useState(false);

  
  const musicArray = ['/doom.mp3','/pillarman.mp3',"/immigration.mp3"]
  const randomNumber = Math.floor(Math.random()*(musicArray.length))



  useEffect(()=>{
    axios.get(`https://api.github.com/repos/${username}/teamable/contents/${filename}`)
          .then((res)=>{setUser(res.data.content)
          }) 
          
  },[])
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!audioPlayed) {
        const keyCode = event.keyCode || event.which;
        if (keyCode) {
          const audio = new Audio(musicArray[randomNumber]); 
          audio.play();
          setAudioPlayed(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [audioPlayed]);
    
  const decoded = Base64.decode(content);
  
  
  return (
    <body className="body">

   <div className="container">
    <header>
      <div className="navcontainer">
      <nav>
        <ul id="NavList">
          <li>
            <span className="navlogo">Code</span>
            <span className="typo">Typo</span>
          </li>
          <li>
            <div id="itemflex">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Login</a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
    </header>
   
    <main>
      <div className="content">

        <div className="language">
          <p>{language}</p>
        </div>
        

        <div className="card">
            <pre>
              {decoded}
            </pre>
        </div>
         <div className="timer">
          <select name="Language" id="select" onChange={(e) => setLanguage(e.target.value)}>
            <option value="Select Language" selected>--Language--</option>
            <option value="JAVA">JAVA</option>
            <option value="PYTHON">PYTHON</option>             
          </select>
          <p>60s</p>
        </div>
      </div>
    </main>

    <footer>
      <div className="footer">
    </div>
    </footer>

   </div>
 
   </body>
 
  );
  
}

export default App;

















