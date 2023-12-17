import { useState} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import axios from 'axios'
import './App.css';

function App() {
  //variable States
  const [file, setUpload] = useState(null);
  const [uploadUrl,setUrl] = useState('');

  //Handlers

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpload(file);
  };
  //On click Listeners
  //Form-Data
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    //Pouzit axios
    const response = await axios.post('http://localhost:3000/upload', formData);
    setUrl(response.data.url);
    console.log(response.data.url);
  };

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
          <code>Select your file:</code>
        <input type="file" onChange={handleFileChange} />
        <br></br>
        <code>Choose upload type:</code>
      <button onClick={handleUpload}>Upload</button>
        </p>
      </div>
      <div className='result'>
        <p>
        {uploadUrl && (
        <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
          {uploadUrl}
        </a>
      )}
      </p>
      </div>

    </>
  );
}

export default App;
