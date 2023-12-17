import dotenv from 'dotenv'
import express from 'express'
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

//Default endpoint
app.get('/',(req,res) => {
    res.send(' Nothing to see here: GET/')
})


//Handle upload
app.use(fileUpload());



app.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });