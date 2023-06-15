import { Router } from "express";
import Quiz from "../models/quiz.js";

const router=Router()

router.post('/',async(req,res)=>
{
  const {question,options,rightAnswer,startDate,endDate}=req.body
  let quiz=new Quiz({question,options,rightAnswer,startDate,endDate})
  let errors=quiz.validateSync()
  if(errors) return res.json(errors)

  const startTime=new Date(startDate).getTime()
  const endTime=new Date(endDate).getTime()
  if(endTime<startTime+15*60*1e3 || endTime>startTime+60*60*1e3) return res.json({error: 'Quiz duration should be between 15 and 60 mins'})

  try
  {
    quiz = await quiz.save()
    res.json({data: quiz})
  }
  catch(e)
  {
    console.error(e);
    res.json({error:'Internal server error'})
  }
})

export {router as quizRouter}