const { response } = require("express");
const express = require("express"); // rquire => taking modules from "node_modules"
const app = express();
const Post = require("./api/models/posts"); // import Post class
const postsData = new Post();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");   // allow to all websites
    next();
})

app.use("/uploads", express.static(__dirname + "/uploads"));    // ( *alias*, *the static folder* )     
                                                                //      => this means whenever a website sends a GET requests
                                                                //      => http://localhost:3000/uploads/... , look in the folder
                                                                //      => of the path __dirname + "/uploads"

/** Get request for getting all the posts */
app.get("/api/posts", (req, res) => {
    res.status(200).send(postsData.get());
});

/** Get request for getting ONE post */
app.get("/api/posts/:post_id", (req, res) => {
    const postId = req.params.post_id;
    const foundPost = postsData.getIndividualBlog(postId);
    foundPost ? res.status(200).send(foundPost) : res.status(404).send("Not Found");
});

app.listen(3000, () => console.log("Listening on http://localhost:3000"));