require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

const port= process.env.PORT || 8000;

mongoose.connect(config.connectionString);

const User = require("./models/user.models");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

//Backend API's

// Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is Required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password Name is Required" });
  }
  const isUser = await User.findOne({ email: email });

  if (isUser) {
    return res.json({ error: true, message: "User Already exist" });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "36000m",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "Registration Sucessfull",
  });
});

//Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required",
    });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "User not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "36000m",
    });
    return res.json({
      error: false,
      message: "Login Successful",
      email,
      accessToken,
    });
  } else {
    return res.status(400).json({
      error: true,
      message: "Invalid credentials",
    });
  }
});

//Get-user
app.get("/get-user", authenticationToken, async (req, res) => {
  const { user } = req.user;

  const isUser = await User.findOne({ _id: user._id });

  if (!user) {
    return res.sendStatus(401);
  }

  return res.json({
    user: {
      fullName: isUser.fullName,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

//Add-Notes
app.post("/add-note", authenticationToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!content) {
    return res.status(400).json({
      message: "Content is required",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server Error",
    });
  }
});

//Edit-note
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, messege: "No changes provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({ error: true, messege: "Note not found" });
    }

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();

    return res.json({
      error: false,
      note,
      messege: "Note updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      messege: "Internal server Error",
    });
  }
});

//Get-All-notes
app.get("/get-all-notes", authenticationToken, async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      messege: "All notes retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      messege: "Internal Server Error",
    });
  }
});

//Delete-note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found",
      });
    }

    await Note.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      messege: "Note Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      messege: "Internal server Error",
    });
  }
});

//Update isPinned value
app.put("/update-note-pinned/:noteId",authenticationToken,async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
      const note = await Note.findOne({ _id: noteId, userId: user._id });

      if (!note) {
        return res.status(404).json({ error: true, messege: "Note not found" });
      }

      note.isPinned = isPinned;

      await note.save();

      return res.json({
        error: false,
        note,
        messege: "Note updated Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        messege: "Internal server Error",
      });
    }
  }
);

//Search-Notes
app.get("/search-notes/",authenticationToken,async (req,res) => {
  const {user} = req.user;
  const {query} = req.query;

  if (!query) {
    return res.status(400).json({error:true,message:"Search query is required"})
  }

  try {
    const matchingNotes = await Note.find({
      userId:user._id,
      $or: [
        {title : {$regex: new RegExp(query,'i')}},
        {content : {$regex: new RegExp(query,'i')}},
      ],
    });

    return res.json({
      error:false,
      notes:matchingNotes,
      message:"Notes matching search retrived successfully"
    });
  } catch (error) {
    return res.status(500).json({error:true, message:"Internal Server Error"})
  }
})

app.listen(port);
console.log("Server is running on port 8000");
module.exports = app;
