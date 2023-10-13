import { toggleCircleLoader } from "../components/circleLoader/circleLoader.js";
import { BlogPost } from "./models/blogPost.js";

const blogContainer = document.querySelector(".blog");
const blogLoader = document.querySelector("#blogLoader");

let blog;

document.addEventListener('DOMContentLoaded', async () => {
    const id = new URLSearchParams(window.location.search).get('id');

    toggleCircleLoader(true, blogLoader)

    try {
        const response = await fetch(`https://wp.erlendjohnsen.com/wp-json/wp/v2/posts/${id}?_embed`);
        blog = await response.json();
        const blogPost = BlogPost.fromJson(blog);
        console.log("Blog: ", blog);
        toggleCircleLoader(false, blogLoader)
        blogContainer.innerHTML = `
        <h1>${blogPost.title}<h1>
        ${blogPost.content}`;
    } catch (error) {
        toggleCircleLoader(false, blogLoader)
        console.log("Error fetching blog:", error);
    }

});