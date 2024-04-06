const express = require('express')
const app = express()
const dotenv=require('dotenv')
var cors=require('cors')
const io=require('socket.io')

dotenv.config();
const PORT=process.env.PORT 

app.use(cors())
app.use(express.json())


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})