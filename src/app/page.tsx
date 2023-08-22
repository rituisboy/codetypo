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
            <p className="navlogo">CodeTypo</p>
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
          <p>HTML</p>
        </div>

        <div className="card">
            <pre>
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
            </pre>
        </div>
        <div className="timer">
          <button className="button">Select Language</button>
          <p>60s</p>
          <button className="buttonstart">Start</button>
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

export default App;