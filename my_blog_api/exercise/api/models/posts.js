const fs = require('fs');

const PATH = "./data.json";

class Post {

    /** Get List of all Blog Posts from our "server" (QUOTE ON QUOTE) */
    get() {
        return this.readData();
    }

    /** Get One Blog post from our "server" */
    getIndividualBlog(postId) {
        const posts = this.readData();
        const foundPost = posts.find(post => postId === post.id);
        return foundPost;
    }

    /** Add new Post to our "server" */
    add(newPost) {
        const currentPostsData = this.readData();
        currentPostsData.unshift(newPost);
        this.storeData(currentPostsData);
    }

    /** Read Data from our "server" */
    readData() {
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData);
        return posts;
    }

    /** Store Data to our "server" */
    storeData(rawData) {
        let data = JSON.stringify(rawData); // turn json object into string object
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;