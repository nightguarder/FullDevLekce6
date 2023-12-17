import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import cors from 'cors'

//dotenv config
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || "3000"
dotenv.config();
const uploadPath = './public/images'

//Express config
const app = express()
app.use(fileUpload())
app.use(express.static('public'))
//Avoid corse issues
//Only allow the fronendserver to join
const corsOrigin = 'http://localhost:5173';
app.use(cors({
  origin:[corsOrigin],
  methods:['GET','POST'],
  credentials: true 
})); 

//Default endpoint
app.get('/',(req,res) => {
    res.send(' Nothing to see here: GET/')
})

//nastaveni express static path
  // Express cesta do static souboru
const imageUrl = (filename) => `http://${HOST}:${PORT}/uploads/${filename}`

app.use('/uploads', express.static('public/images'));
// Endpoint pro nahrávání souborů
app.post('/upload',async (req, res) => {
  console.log('POST request received to /upload.')
  const file = req.files.file
  //Kontrola if request has a body...
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  // Kontrola if it starts with image
  else if (!file.mimetype.startsWith('image/')) {
    return res.status(400).json({ error: 'Please upload an image only' });
  }
  //Bacha na jmeno!
  //formData.append('file', upload);
  try {
    await file.mv(uploadPath + "/" + file.name)
    res.sendStatus(200).send('Uplaod Complete')
    res.json({
      name: file.name,
      size: file.size,
      url: imageUrl(file.name)
  })
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  
  
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });