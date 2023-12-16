import dotenv from 'dotenv'
import express from 'express'

import fileUpload from 'express-fileupload'

//Variables

const PORT = process.env.PORT || "3000"
dotenv.config();
const app = express()

//Default endpoint
app.get('/',(req,res) => {
    res.send(' You are at default endpoint: /')
})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });