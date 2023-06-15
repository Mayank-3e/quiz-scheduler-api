import { Schema, model } from "mongoose";

const schema=new Schema({
  ip: String,
  apiUsed: {
    type: Map,
    of: Number
  }
})

const IP=model('IP',schema)
export default IP