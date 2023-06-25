//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to SereneSoul— your cozy online haven! Get ready to dive into a world brimming with inspiration, connections, and good vibes. Our little corner of the internet is all about personal growth, heartfelt conversations, and shared experiences. We've got a delightful mix of articles, poetry, and interviews that'll tickle your curiosity and fill your heart with joy. But hey, it's not just us doing the talking! We want to hear your thoughts too. This is a friendly and inclusive space where you can engage, share, and connect with fellow readers. So, kick off your shoes, get comfy, and let's embark on this amazing adventure together. SereneSoul is here to be your digital home – a place where you can find warmth, realness, and endless inspiration. Welcome, friend!";

const aboutContent = "SereneSoul is an online platform dedicated to nurturing personal growth and fostering meaningful connections. Our mission is to create a digital haven where individuals can explore their passions, engage in heartfelt conversations, and share their experiences. Through a curated collection of articles, poetry, and interviews, we aim to inspire and uplift our readers, sparking curiosity and igniting joy. SereneSoul is not just a place for us to speak, but a community where your voice matters. We encourage you to join us in this inclusive space, where you can express your thoughts, connect with like-minded individuals, and embark on a transformative journey of self-discovery. Together, let's create a virtual home filled with authenticity, warmth, and endless inspiration.";

const contactContent = "We would love to hear from you! If you have any questions, feedback, or simply want to say hello, feel free to get in touch with us. You can reach out to us through the following channels. ";


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];


app.get("/", function(req, res){
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts,
  });


}); 

app.get("/about", function(req, res){
  res.render("about", {aboutParagraph: aboutContent});
}); 

app.get("/contact", function(req, res){
  res.render("contact", {contactParagraph: contactContent});
});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = req.params.postName;
  posts.forEach(function(post){
    let storedTitle = post.title;

    if (storedTitle == requestedTitle){
      console.log("Match found!");
    } else{
      console.log("Match not found!");
    }
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", function(req, res){
    const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };
  posts.push(post);

  res.redirect("/");
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
