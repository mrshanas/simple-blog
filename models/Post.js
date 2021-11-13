import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/blogDB");

const blogPostSchema = new mongoose.Schema({
  title: String,
  post: String,
});

const Post = mongoose.model("Post", blogPostSchema);

export { Post };
