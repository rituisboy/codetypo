"use client"
import axios from "axios";
import './App.css';
import { useEffect,useState,useRef } from 'react';
import { Base64, decode } from 'js-base64';
import { Montserrat } from "next/font/google";
import python from './codeurl/python'
import Java from './codeurl/Java'
import { count } from "console";

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
  
  const [count, setCount] = useState(60)
  const [startTimer, setStartTimer] = useState(false)   
  const [greenCharacterCount, setGreenCharacterCount] = useState(0);
  const [wpm, setWPM] = useState(0); 
  const inputRef = useRef<HTMLInputElement>(null);
  const onInputclick = ()=>{
    if (inputRef.current){
      inputRef.current.focus()
    }
      
      setIsHidden(!isHidden)
  }
  // useEffect(() => {
  //   let interval
  //   if (startTimer){
  //      interval = setInterval(() => {
  //     setCount((prevTime) => (prevTime>0? prevTime -1 : prevTime));
  //   }, 1000);
  // }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [startTimer]);
  useEffect(() => {
    let interval: any;
  
    if (startTimer) {
      interval = setInterval(() => {
        setCount((prevTime) => (prevTime > 0 ? prevTime - 1 : prevTime));
      }, 1000);
    }
    const greenCount = Array.from(
      document.querySelectorAll('.correct')
    ).filter((element) => element.classList.contains('green')).length;
    setGreenCharacterCount(greenCount);

    const calculatedWPM = Math.round(greenCount / 5);
    setWPM(calculatedWPM);
  
    return () => {
      clearInterval(interval);
    };
  }, [startTimer,count]);
  


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
    const greenCount = Array.from(
      document.querySelectorAll('.correct')
    ).filter((element) => element.classList.contains('green')).length;
  
    setGreenCharacterCount(greenCount);
  }, [userInput]);
  

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
                        ? 'correct green'
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
                  disabled={count <= 0}
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
          <p>Green Characters: {greenCharacterCount}</p> 
          {count === 0 && <p>WPM: {wpm}</p>}
          
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

















