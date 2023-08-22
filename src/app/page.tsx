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
  const [language,setLanguage] = useState('Select Language')

  useEffect(()=>{
    axios.get(`https://api.github.com/repos/${username}/teamable/contents/${filename}`)
          .then((res)=>{setUser(res.data.content)
          }) 
          
  },[])
    
  const decoded = Base64.decode(content);
  const lines = decoded.split('\n');
  console.log(lines)
  
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
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
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

















