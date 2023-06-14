import { Model, Schema } from "mongoose";

const schema=new Schema({
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  rightAnswer: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: String
})

const Quiz=Model('Quiz',schema)
export default Quiz