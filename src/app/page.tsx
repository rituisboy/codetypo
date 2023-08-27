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
  const [userInput, setUserInput] = useState('')  
  const [isHidden,setIsHidden] = useState(false)
  const inputRef = useRef()
  const [count, setCount] = useState(60)
  const [startTimer, setStartTimer] = useState(false)   

  const onInputclick = ()=>{
      inputRef.current.focus()
      setIsHidden(!isHidden)
  }
  useEffect(() => {
    let interval
    if (startTimer){
       interval = setInterval(() => {
      setCount((prevTime) => prevTime - 1);
    }, 1000);
  }

    return () => {
      clearInterval(interval);
    };
  }, [startTimer]);


  useEffect(() => {
    if (language == 'PYTHON') {
      setUser(python[1])
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
  useEffect(() => {
    window.addEventListener('keydown', onInputclick);
    document.addEventListener('keydown', () => setStartTimer(!startTimer));

    return () => {
      window.removeEventListener('keydown', onInputclick);
      
      document.addEventListener('keydown', () => setStartTimer(!startTimer));

    };
  }, []);

    
  const TextDisplay = content
  const character = TextDisplay.split('')

  
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
        

        <div className="card" onKeyDown={onInputclick}>
            <pre>
            <div className="quote-display" >
              {character.map((character, index) => (
                  <span
                    key={index}
                    className={
                      userInput[index] === undefined
                        ? 'active'
                        : userInput[index] === character
                        ? 'correct'
                        : 'incorrect'
                    }
                  >
                    {character}
                  </span>
               ))}
            </div>
            </pre>
        </div>
        <div>
          <input  className="inputField"  
                  type="text" value={userInput} 
                  onChange={(e)=>setUserInput(e.target.value)}
                  ref={inputRef}
          />
        </div>
         <div className="timer">
          <select name="Language" onKeyDown={onInputclick} 
                                  className={(isHidden)?'hidden':''} 
                                  id="select" onChange={(e) => {setLanguage(e.target.value)}}
          >
            <option id= "languageSelector" value="Select Language" selected>--Language--</option>
            <option id= "languageSelector" value="JAVA">JAVA</option>
            <option id= "languageSelector" value="PYTHON">PYTHON</option>             
          </select>

          <p>{count}</p>
          
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

















