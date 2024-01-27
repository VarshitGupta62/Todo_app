const express = require('express');
const mongoose = require('mongoose');
const Database = require('./db/database'); 
const bodyParser = require('body-parser'); 
const Student = require('./schemas/studentSchema'); //model
const cors = require('cors')// access for url because port change
const app = express();
const port = 3000;

const MongoDB = `mongodb://127.0.0.1:27017/${Database}`;

app.use(bodyParser.json());
app.use(cors());

  mongoose.connect(MongoDB)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.error("Error connecting to Database", err);
  });
  
  // Routes for students

  app.get('/api/students', async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students); 
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/api/students/:id', async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/api/students', async (req, res) => {
    const newStudent = new Student(req.body);
  
    try {
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  app.delete('/api/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  });

  app.put('/api/students/:id', async (req, res) => {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStudent);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})