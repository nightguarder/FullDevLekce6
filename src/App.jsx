import { useState, useEffect} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import './App.css';

function App() {
  //variables

  const [upload,setUpload] = useState(false)

  const fileChange = (e) => {
    if(e.target.files){
    setFile(e.target.files[0]);
    }
  };

  const handleUpload = ()=>{
    if (!file)
      return;
    
    else{
      try {

        const formData = new FormData();
        formData.append('image', file);

        //manual Headers for single file upload
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
        });
    }
    catch{

    }
  }

  return (
    <>
      <div>
        <a href="https://expressjs.com" target="_blank" rel="noreferrer">
          <img src={expressLogo} className="logo" alt="ExpressJs logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Image upload with Form Data</h1>
      <div className="card">
        <p>
          <button onClick={handleUpload}>Upload</button>
        </p>
      </div>

    </>
  );
}

export default App;
