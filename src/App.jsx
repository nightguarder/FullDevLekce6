import { useState} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import './App.css';

function App() {
  //variable States

  const [upload,setUpload] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUpload(file);
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
          <button onClick={handleUpload}>Upload</button>
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
