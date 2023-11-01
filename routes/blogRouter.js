const express = require("express");
const { BlogModel } = require("../models/blogModel");
const { auth } = require("../middlewares/auth.middleware");

const blogRouter = express.Router();

// Create
blogRouter.post("/blogs", auth, async (req, res) => {
  try {
    const { title, content, category, date } = req.body;
    const userID = req.body.userID;
    const username = req.body.username;

    const blog = new BlogModel({ userID, username, title, content, category, date, likes: 0, comments: [] });
    await blog.save();
    res.status(201).json({ msg: "Blog created successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Failed to create a blog" });
  }
});

// Get all blogs
blogRouter.get("/blogs", auth, async (req, res) => {
  try {
    const blogs = await BlogModel.find({ userID: req.body.userID });
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Update
blogRouter.patch("/blogs/:id", auth, async (req, res) => {
  const { title, content, category, date } = req.body;
  try {
    const blog = await BlogModel.findOneAndUpdate(
      { _id: req.params.id, userID: req.body.userID },
      { title, content, category, date },
      { new: true }
    );
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ msg: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ error: "Failed to update the blog" });
  }
});

// Delete
blogRouter.delete("/blogs/:id", auth, async (req, res) => {
    const {id}=req.params;
    const blog=await BlogModel.findOne({_id: req.params.id})
  try {
    if (req.body.userID!==blog.userID) {
      return res.status(404).json({ error: "Blog not found" });
    }else{
        await BlogModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({ msg: "Blog deleted successfully"});
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to delete the blog" });
  }
});

module.exports = {
  blogRouter
};
