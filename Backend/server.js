const cors = require('cors')
const dbConnect = require('./config/dbConnect')
const express = require('express')
const errorHandler  =require('./middleware/errorMiddleware')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 2500

dbConnect()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api',require('./routes/userRoutes'))


app.use(errorHandler)
app.listen(PORT , ()=>{
    console.log(`🤖 Server is up and running on port ${PORT} 🤖`);
})