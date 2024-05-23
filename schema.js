const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const MentorSchema =new Schema({
    name: {type:String},
    qualification:{type:String},
    age:{type:Number},
    student:{type:Array},
});

const StudentSchema = new Schema({
    name: { type: String },
    id: { type: Number },
    std: { type: String },
    mentor: { type: String },
   
  });

const MentorModel = mongoose.model("mentor", MentorSchema);
const StudentModel = mongoose.model("student", StudentSchema);

module.exports={
    MentorModel,
    StudentModel,
    
};