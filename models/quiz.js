import { Schema, model } from "mongoose";

const schema=new Schema({
  question: {
    type: String,
    required: [true,'Question title is required']
  },
  options: {
    type: [String],
    required: [true,'Options are required'],
    validate:
    {
      validator: (options) => options.length>1,
      message: 'Provide at least 2 options'
    }
  },
  rightAnswer: {
    type: Number,
    required: [true,'Right answer is required']
  },
  startDate: {
    type: Date,
    required: true,
    validate:
    {
      validator: (d) => d>=Date.now()+5*60*1e3,
      message: 'Start date should be given at least 5 mins from now'
    }
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'inactive'
  }
})

const Quiz=model('Quiz',schema)
export default Quiz