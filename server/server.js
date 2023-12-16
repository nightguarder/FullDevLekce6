import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'

//dotenv config
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || "3000"
dotenv.config();

//Express config
const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(express.static('public'))
app.use(cors()); 
//[Error] Fetch API cannot load https://localhost:3000/upload due to access control checks

//Default endpoint
app.get('/',(req,res) => {
    res.send(' Nothing to see here: GET/')
})

// Project public upload path
const uploadPath = 'public/images'

//Handle upload
//NENI MOJE TVORBA
//https://rostislavjadavan.com/posts/designing-file-upload-endpoint-in-rest-api
app.post("/upload", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  //The name has to match formData.append('myfile', upload);
  let uploadedFile = req.files.myfile
    //*Security risk* User can upload harmful data?  
    await uploadedFile.mv(uploadPath + '/' + uploadedFile.name)
    try {
      await uploadedFile.mv(uploadPath);
      console.log("Upload complete.")
      res.json({
        name: uploadedFile.name,
        size: uploadedFile.size,
        url: generateUrl(uploadedFile),
    });
    } 
    catch (err) {
      res.status(500).send(err.message);
    }
  });
  function generateUrl(uploadedFile) {
    // Generate the URL based on the uploaded image name
    return `http://localhost:${PORT}/uploads/images/${uploadedFile.name}`;
  }

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });