import { useState} from 'react';
import reactLogo from './assets/react.svg';
import expressLogo from '/express-js.svg';
import './App.css';

function App() {
  //variable States

  const [file,setFile] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    if(e.target.files){
    setFile(e.target.files[0]);
    }
  };

  const handleUpload = async ()=>{
    try {
      
        const formData = new FormData();
        //append file data 
        formData.forEach((file, i) => {
          data.append(`file-${i}`, file, file.name);
        });
        //fetch with temporary headers
        //fetch the file with the upload endpoint
        const response = await fetch('http://localhost:3000/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-type': 'multipart/form-data',
          },
        })
        //If the upload is complete
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setImageUrl(data.url);  
        } else {
          console.error('Error uploading data to the server.', response.statusText);
        }
      } catch (error) {
        console.error('Something went wrong.', error.message);
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
        { file && `${file.name} - ${file.type}`}
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
