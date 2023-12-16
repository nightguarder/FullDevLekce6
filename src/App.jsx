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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('myfile', upload);

      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
        headers:{
          'Content-Type': formData.type,
          'content-length': `${formData.size}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Something went wrong:', error.message);
    }
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
      <div className='fileDiv'>
      <p>
        <input type="file" className="fileInput"  onChange={handleFileChange} />
        { upload && `${upload.name} - ${upload.type}`}
        </p>
      </div>
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
