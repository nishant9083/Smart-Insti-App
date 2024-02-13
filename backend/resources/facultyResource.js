import Faculty from "../models/faculty.js";
import express from "express";
import * as messages from "../constants/messages.js";
import tokenRequired from "../middlewares/tokenRequired.js";

const facultyRouter = express.Router();

facultyRouter.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find().populate("courses");
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

facultyRouter.post("/", async (req, res) => {
  const { email } = req.body;
  let existingUser = await Faculty.findOne({ email });
  try {
    if (!existingUser) {
      const newUser = new Faculty({ email });
      await newUser.save();
      res.send({ message: messages.userCreated, user: newUser });
    } else {
      res.send({
        message: messages.userAlreadyExists,
        user: existingUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

facultyRouter.get("/:id", tokenRequired, async (req, res) => {
  const facultyId = req.params.id;

  try {
    const faculty = await Faculty.findById(facultyId);

    if (!faculty) {
      return res.status(404).json({ message: messages.userNotFound });
    }

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

facultyRouter.post("/", async (req, res) => {
  const { email } = req.body;
  let existingUser = await Faculty.findOne({ email });
  try {
    if (!existingUser) {
      const newUser = new Faculty({ email });
      await newUser.save();
      res.send({ message: messages.userCreated, user: newUser });
    } else {
      res.send({
        message: messages.userAlreadyExists,
        user: existingUser,
      });
    }
  } catch (error) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

facultyRouter.put("/:id", async (req, res) => {
  const facultyId = req.params.id;
  const facultyData = req.body;

  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(
      facultyId,
      facultyData,
      { new: true }
    ).populate("courses");
    res.json(updatedFaculty);
  } catch (error) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

facultyRouter.delete("/:id", async (req, res) => {
  const facultyId = req.params.id;

  try {
    const deletedFaculty = await Faculty.findByIdAndDelete(facultyId).populate(
      "courses"
    );
    res.json(deletedFaculty);
  } catch (error) {
    res.status(500).json({ message: messages.internalServerError });
  }
});

export default facultyRouter;
