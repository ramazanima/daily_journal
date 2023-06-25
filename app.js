//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to our daily journal blog, where you can capture and share the essence of each day. Express yourself, reflect on your thoughts and emotions, and document your life journey. Whether seeking personal growth, a creative outlet, or connection with others, our platform offers a safe and supportive community. Start writing your story today and let your words inspire and resonate with others. Join us on this daily writing adventure.";

const aboutContent = "Welcome to our Daily Journal Blog! We are passionate about providing a platform for individuals like you to embrace the power of daily journaling. Our mission is to create a space where you can freely express yourself, reflect on your experiences, and find inspiration in the simple act of writing. Whether you're seeking personal growth, a creative outlet, or a way to connect with like-minded individuals, our community is here to support you. Through the power of words, we believe that every day is an opportunity to document your journey and discover the incredible stories that unfold within your life. Join us and unlock the transformative potential of daily journaling today.";

const contactContent = "We would love to hear from you! If you have any questions, feedback, or simply want to say hello, feel free to get in touch with us. You can reach out to us through the following channel.";


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
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    let storedTitle = _.lowerCase(post.title); 

    if (storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content,
      });
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
