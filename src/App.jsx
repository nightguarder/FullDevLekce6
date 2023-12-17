import { useState} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import './App.css';

function App() {
  //variable States
  const [upload, setUpload] = useState(null);
  const handleufileChange = (event) => {
    const upload = event.target.uploads[0];
    setUpload(upload);
  };
  //Base 64
  const handleUploadBase64 = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(upload);
    reader.onloadend = async () => {
      const base64 = reader.result.split(',')[1];
      const response = await axios.post('http://localhost:3000/upload-base64', { upload: base64 });
      console.log(response.data.url);
    };
  };
  //Form-Data
  const handleUploadFormData = async () => {
    const formData = new FormData();
    formData.append('file', upload);
    const response = await axios.post('http://localhost:3000/upload-form-data', formData);
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
      <button onClick={handleUploadBase64}>Base64</button>
      <button onClick={handleUploadFormData}>FormData</button>
        </p>
      </div>
      <div className='result'>
        <p>
        {imageUrl && (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          {imageUrl}
        </a>
      )}
      </p>
      </div>

    </>
  );
}

export default App;
