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

//nastaveni express static path
app.use('/uploads', express.static(path.join(__dirname, '../app/public')));

// Endpoint pro nahrávání souborů
app.post('/upload', (req, res) => {
  // Získání souboru z požadavku
  const file = req.files.myfile;

  // Kontrola if it starts with image
  if (!file.mimetype.startsWith('image/')) {
    return res.status(400).json({ error: 'Invalid file type. Please upload an image' });
  }

  // Express cesta do static souboru
  const uploadPath = path.join(__dirname, '../app/public', file.name);
  // Uložení souboru
  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Vrácení URL k nahrávanému souboru
    res.json({
      url: `/uploads/${file.name}`,
      filename: file.name,
    });
  });
});

app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });