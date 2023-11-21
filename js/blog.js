import { BlogPost } from "./models/blogPost.js";
import { buildBlogLoader } from "../components/loaders/loaders.js";
import { fetchAndDisplayComments } from "./blogComments.js";
import { baseUrl } from "./helpers/url.js";

const blogContainer = document.querySelector(".blog");

const blogCategory = document.querySelector(".blog-category");
const blogHeader = document.querySelector(".blog-header");
const blogAuthorDate = document.querySelector(".blog-author-date");
const blogImage = document.querySelector(".blog-image");
const blogContent = document.querySelector(".blog-content");
const blogImgDialog = document.querySelector("#blogImgDialog");

let blog;

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogData();
    fetchAndDisplayComments();
});

async function fetchBlogData() {
    buildBlogLoader(blogHeader, blogImage, blogContent);

    let description = document.head.children[3].content;
    let blogPost;
    const id = new URLSearchParams(window.location.search).get('id');

     try {
        const response = await fetch(`${baseUrl()}/posts/${id}?_embed`);
        blog = await response.json();
        blogPost = BlogPost.fromJson(blog);

        document.title += ` ${blogPost.title}`;
        description = blogPost.excerpt;
        blogCategory.innerHTML = `${blogPost.category}`;
        blogHeader.innerHTML = `${blogPost.title}`;
        blogAuthorDate.innerHTML = `${blogPost.author} - ${blogPost.date}`;
        blogContent.innerHTML = `${blogPost.content}`;
        blogImage.innerHTML = `<img src="${blogPost.featuredImage}" 
                                    alt="${blogPost.featuredImageAlt}"
                                    srcset="">
                                <figcaption>${blogPost.featuredImageCaption}</figcaption>`;

    } catch (error) {
        console.error(error);
        blogContainer.innerHTML = `<div>
                                    <p class="ta-center w-full">Oops... Something went wrong😞</p>
                                    <button class="cta" onclick="history.back()" type="button" title="Go back">Go back</button>
                                </div> `;
    } 

    blogImage.addEventListener('click', () => {
        blogImgDialog.innerHTML = `<img src="${blogPost.featuredImage}" 
        alt="${blogPost.featuredImageAlt}"
        srcset="">`
        blogImgDialog.showModal();
    });

    blogImgDialog.addEventListener('click', (event) => {
        if (event.target.localName != "img") {
            blogImgDialog.close();
        }
    });
}



