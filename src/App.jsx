import { useState} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import axios from 'axios'
import './App.css';

function App() {
  //variable States
  const [upload, setUpload] = useState(null);
  const [uploadUrl,setUrl] = useState('');

  //Handlers

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpload(file);
  };

  //On click Listeners
  //Base64
  //Form-Data
  const handleUploadFormData = async () => {
    const formData = new FormData();
    //Bacha na jmeno!
    formData.append('file', upload);
    //Pouzit axios misto fetch...
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
      <button onClick={handleUploadFormData}>FormData</button>
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
