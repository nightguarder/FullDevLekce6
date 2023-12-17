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
app.use(fileUpload());

app.post("/upload", async (req, res) => {
  let uploadedFile = req.files.myfile;

  try {
    
    await uploadedFile.mv(uploadPath,(err)=>{
      if(err){
        return res.status(500).json({ error: err.message });
      }
      res.json({
        url: generateUrl(uploadedFile),
        filename: uploadedFile.name,
      });
    });
  } catch (err) {
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