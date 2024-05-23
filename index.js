const express = require("express");
const app = express();
const { mongoose, } = require("./db");
const  { MentorModel, StudentModel }   = require("./schema");
const bodyparser = require("body-parser");


app.use(bodyparser.json());


    app.get("/", async (request, response) => {
      await mongoose.connect(mongoDB);
      console.log(mongoose.connection.readyState);
    
      if (mongoose.connection.readyState == 1) {
        response.send("Server Started and Connected to db");
      } else {
        response.send("Server Started");
      }
    });

   
app.post("/createMentor", (req, res) => {
  const name = req.body.name;
  const qualification = req.body.qualification;
  const age = req.body.age;

  // console.log(name, "name");

  MentorModel.create({
    name,
    qualification,
    age,
  })
    .then((dbRes) => {
      res.send(dbRes);
    })
    .catch((err) => console.log(err));
});

app.post("/createStudent", async (req, res) => {

  const name = req.body.name;
  const id = req.body.id;
  const std = req.body.std;
  const mentor = req.body.mentor;

  const doc = await StudentModel.create({
    name,
    id,
    std,
  });

  res.send(doc);
});
    
    
    app.put("/connectStudent", (req,res)=>{
      const mentorsname = req.body.mentorsname;
      const StudentList = req.body.StudentList;

      console.log(mentorsname);
      console.log(StudentList);

      const filter = { name:mentorsname };
      const update = { student:StudentList};

      MentorModel.findOneAndUpdate(filter, update)
      .then((dbresponse) => {
        res.send(dbresponse);
      })
      .catch((err) => console.log(err));
  });
   
  app.put("/connectMentor", async (req,res) =>{
    const studentId =req.body.id;
    const mentorsname =req.body.mentor;

    const filter={ id:studentId };
    const update={ mentor:mentorsname };

    const doc = await StudentModel.findOneAndUpdate(filter, update);
    console.log(doc, "doc");
  
    res.send("Student Mapped Successfully");
  });

  app. put("/studentlist", async(req,res) =>{
    const mentorsname = req.body.mentorsname;
    const StudentList = req.body.StudentList;
      
    const filter = { name:mentorsname };
    const update = { student:StudentList};

   const doc = await MentorModel.findOne(filter,update)
    res.send(StudentList);
  })

// app.put("/previousMentor", async (req,res) =>{
//   const studentId =req.body.id;
//   const mentorsname =req.body.mentor;
//   const previousmentor =req.body.prevmentor;

//   const filter={ id:studentId };
//  const update={ mentor:mentorsname,prevmentor:previousmentor };


//   const doc = await StudentModel.findOne(filter,update);
//   console.log(doc, "doc");

//   res.send("Student Mapped Successfully");
// });
    
  
app.listen(4000, () =>{
    console.log("Server started at 4000");
});

