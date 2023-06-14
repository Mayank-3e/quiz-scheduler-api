import express from 'express'
import cors from 'cors'
import connectDB from './db.js'
import {quizRouter} from "./controllers/quiz.js"

const app=express()
app.use(express.json())
app.use(cors())
const port=process.env.PORT||4000
connectDB()

app.get('/',(req,res)=>
{
  res.send('hi')
})
app.use('/quizzes',quizRouter)

app.listen(port,()=>console.log('App is running on port '+port))