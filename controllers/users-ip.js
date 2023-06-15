import IP from "../models/users-ip.js";

export default async function middleware(req,res,next)
{
  try
  {
    let user=await IP.findOne({ip: req.headers['x-real-ip']}).exec()
    if(!user) user=await IP.create({
      ip: req.headers['x-real-ip'],
      apiUsed: {}
    })
    const curdate=new Date().toLocaleDateString()
    const keysused=user.apiUsed.get(curdate)
    if(!keysused) user.apiUsed.set(curdate,1)
    else if(keysused==100) return res.json({error: 'You have used todays quota of 100 API calls'})
    else user.apiUsed.set(curdate,keysused+1)

    await user.save()
    next()
  }
  catch(e)
  {
    console.error('Error in middleware: ',e);
    res.json({error: 'Internal server error'})
  }
}