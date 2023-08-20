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

    <div>
    <div className="parent-container">
      <div className='centered-div'>
        <pre >
            {lines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
        </pre>
      </div>
    </div>

  </div>
  );
  
}

export default App;

















