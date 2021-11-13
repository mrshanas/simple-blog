//jshint esversion:6

import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";
import mongoose from "mongoose";
import {
  homeStartingContent,
  aboutContent,
  contactContent,
} from "./views/content.js";
import { Post } from "./models/Post.js";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

// Chained routes for compose
const posts = [];
app
  .route("/compose")
  .get((req, res) => {
    res.render("compose");
  })
  .post((req, res) => {
    const blogPost = new Post({
      title: req.body.title,
      post: req.body.composerBar,
    });
    blogPost.save();
    posts.push(blogPost);

    res.redirect("/");
  });

app.get("/posts/:postID", (req, res) => {
  const requestedPost = req.params.postID;

  Post.findOne({ _id: requestedPost }, (err, post) => {
    if (!err) {
      res.render("post", {
        heading: post.title,
        content: post.post,
      });
    } else {
      console.log(err);
    }
  });
});

app.get("/", (req, res) => {
  Post.find({}, (error, collection) => {
    if (!error) {
      res.render("home", {
        blogContents: collection,
        homeStartingContent: homeStartingContent,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
