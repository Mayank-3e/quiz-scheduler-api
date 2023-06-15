import Quiz from "../models/quiz.js";
import * as dotenv from 'dotenv'
dotenv.config()

export default async function cronjob(quizId,scheduledTime,status)
{
  console.log(quizId,scheduledTime,status);
  let scheduleResult=await fetch(`https://qstash.upstash.io/v1/publish/${process.env.backend_url}/quizzes/${quizId}/status`,
  {
    method: 'POST',
    headers:
    {
      'Content-Type':'application/json',
      'Authorization':`Bearer ${process.env.cron_api}`,
      'Upstash-Not-Before': Math.ceil(scheduledTime/1e3)
    },
    body: JSON.stringify({status})
  })
  scheduleResult=await scheduleResult.json()
  if(scheduleResult.error) await Quiz.findByIdAndDelete(quizId)
  return scheduleResult
}