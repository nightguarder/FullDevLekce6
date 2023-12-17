import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'

//dotenv config
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || "3000"
dotenv.config();

//Express config
const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(express.static('public'))

//Default endpoint
app.get('/',(req,res) => {
    res.send(' Nothing to see here: GET/')
})

app.post('/upload', (req, res) => {
  // Získání souboru z požadavku
  //the .file has to match formData.append('file', upload);
  const file = req.files.file;

  // Nastavení cesty pro uložení souboru
  const uploadPath = path.join(__dirname, '../app/public', file.name);
  // Uložení souboru
  

});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });