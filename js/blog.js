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

    let blogPost;
    const id = new URLSearchParams(window.location.search).get('id');

     try {
        const response = await fetch(`${baseUrl()}/posts/${id}?_embed`);
        blog = await response.json();
        blogPost = BlogPost.fromJson(blog);

        document.title += ` ${blogPost.title}`;
        document.querySelector('meta[name="description"]').setAttribute("content", blogPost.excerpt);
      
        document.querySelector('meta[property="og:title"]').setAttribute("content", blogPost.title);
        document.querySelector('meta[property="og:description"]').setAttribute("content", blogPost.excerpt);
        document.querySelector('meta[property="og:image"]').setAttribute("content", blogPost.featuredImage);
        document.querySelector('meta[property="og:url"]').setAttribute("content", `${baseUrl()}/pages/blog.html?id=${id}`);

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



