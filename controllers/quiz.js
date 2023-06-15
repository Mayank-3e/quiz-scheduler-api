import { Router } from "express";
import Quiz from "../models/quiz.js";
import cronjob from "./cronjob.js";

const router=Router()

router.post('/',async(req,res)=>
{
  const {question,options,rightAnswer,startDate,endDate}=req.body
  let quiz=new Quiz({question,options,rightAnswer,startDate,endDate})
  let errors=quiz.validateSync()
  if(errors) return res.json(errors)

  if(rightAnswer>=options.length) return res.json({error: 'Provide 0-indexed right answer with appropriate index'})

  const startTime=new Date(startDate).getTime()
  const endTime=new Date(endDate).getTime()
  if(endTime<startTime+15*60*1e3 || endTime>startTime+60*60*1e3) return res.json({error: 'Quiz duration should be between 15 and 60 mins'})

  try
  {
    quiz = await quiz.save()
    let scheduleResult=await cronjob(quiz._id,startTime,'active')
    if(scheduleResult.error) return res.json(scheduleResult)
    scheduleResult=await cronjob(quiz._id,endTime,'finished')
    if(scheduleResult.error) return res.json(scheduleResult)
    res.json({data: quiz})
  }
  catch(e)
  {
    console.error(e);
    res.json({error:'Internal server error'})
  }
})

// set quiz status using cron job
router.post('/:quizId/status',async(req,res)=>
{
  const {quizId}=req.params, {status}=req.body
  try
  {
    const quiz=await Quiz.findByIdAndUpdate(quizId,{status},{returnDocument: 'after'})
    res.json({data: quiz})
  }
  catch(e)
  {
    console.error(e);
    res.json({error:'Internal server error'})
  }
})

router.get('/all',async(_,res)=>
{
  try
  {
    const quizzes = await Quiz.find()
    res.json({data: quizzes})
  }
  catch(e)
  {
    console.error(e);
    res.json({error:'Internal server error'})
  }
})

export {router as quizRouter}