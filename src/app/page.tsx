"use client"
import axios from "axios";
import './App.css';
import { useEffect,useState,useRef } from 'react';
import { Base64, decode } from 'js-base64';
import { Montserrat } from "next/font/google";
import python from './codeurl/python'
import Java from './codeurl/Java'

const monserrat = Montserrat({subsets: ['cyrillic'] } )


type LanguageUrlDictionary = {
  [language: string]: string;
};

const randomCodeurl = (languageUrlDictionary:LanguageUrlDictionary)=>{
  
  const keys = Object.keys(languageUrlDictionary);
  const randomIndex = Math.floor(Math.random()*keys.length)
  return languageUrlDictionary[keys[randomIndex]]
}


  
function App() {
  const [content,setUser] = useState('')
  const [language,setLanguage] = useState('Select language')
  // const [audioPlayed, setAudioPlayed] = useState(false);
  const [UserInput, setUserInput] = useState('')  
   
  // const musicArray = ['/music/doom.mp3','/music/pillarman.mp3',"/music/immigration.mp3"]
  // const randomNumber = Math.floor(Math.random()*(musicArray.length))
  // const audio = new Audio(musicArray[randomNumber]); 

  
  useEffect(() => {
    if (language == 'PYTHON') {
      axios.get(randomCodeurl(python))
        .then((res) => {
          setUser(res.data.content);
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (language == 'JAVA') {
      axios.get(randomCodeurl(Java))
        .then((res) => {
          setUser(res.data.content);
        })
        .catch(e => {
          console.log(e);
        });
    }    
  }, [language]);


    
  const TextDisplay = Base64.decode(content);
  
  
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
   
    <main className={monserrat.className}>
      <div className="content">

        <div className="language">
          <p>{language}</p>
        </div>
        

        <div className="card">
            <pre>
              {TextDisplay}
              {UserInput}
            </pre>
        </div>
        <div>
          <input  className="inputField"  
                  type="text" value={UserInput} 
                  onChange={(e)=>setUserInput(e.target.value)}
          />
        </div>
         <div className="timer">
          <select name="Language" id="select" onChange={(e) => {setLanguage(e.target.value)}}>
            <option id= "languageSelector" value="Select Language" selected>--Language--</option>
            <option id= "languageSelector" value="JAVA">JAVA</option>
            <option id= "languageSelector" value="PYTHON">PYTHON</option>             
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

















