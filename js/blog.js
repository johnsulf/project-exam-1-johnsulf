import { BlogPost } from "./models/blogPost.js";
import { buildBlogLoader } from "../components/loaders/loaders.js";
import { formattedDate } from "./helpers/timeFormatter.js";
import { displayToast } from "../components/toast/toast.js";

const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2";

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
  buildBlogLoader(blogHeader, blogAuthorDate, blogImage, blogContent);

    let description = document.head.children[3].content;
    let blogPost;
    const id = new URLSearchParams(window.location.search).get('id');

    try {
        const response = await fetch(`${baseUrl}/posts/${id}?_embed`);
        blog = await response.json();
        blogPost = BlogPost.fromJson(blog);

        console.log("Blog: ", blog);

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
        console.log("Error fetching blog:", error);
    }

    blogImage.addEventListener('click', (event) => {
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

async function fetchAndDisplayComments() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const commentsSection = document.querySelector('.blog__conversation__comments');

    try {
        const response = await fetch(`${baseUrl}/comments?post=${postId}`);
        if (response.ok) {
            const comments = await response.json();
            let commentsHTML = '<h3>Comments</h3>';

            if (comments.length === 0) {
                commentsHTML += `<p>There is no comments yet. Start the conversation!</p>`;
            } 

            for (const comment of comments) {
                commentsHTML += `
                    <div class="blog__conversation__comments__comment">
                        <h4>${comment.author_name}</h4>
                        <time class="fs-xs">${formattedDate(comment.date)}</time>
                        <p>${comment.content.rendered}</p>
                    </div>
                `;
            }

            commentsSection.innerHTML = commentsHTML;
        }
    } catch (error) {
        console.error("Failed to fetch comments:", error);
    }
}

const form = document.querySelector(".blog__conversation__form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const postId = new URLSearchParams(window.location.search).get('id');
    const name = document.querySelector("#commentName");
    const email = document.querySelector("#commentEmail");
    const comment = document.querySelector("#commentComment");
    const submitButton = document.querySelector("#commentSubmit");

    const toast = document.querySelector("#commentsToast");

    const payload = JSON.stringify({
        post: postId,
        author_name: name.value,
        author_email: email.value,
        content: comment.value,
    });

    submitButton.disabled = true;
    
    displayToast('waiting', toast);

    try {
        const response = await fetch(`${baseUrl}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
        });

        if (response.ok) {
            name.value = '';
            email.value = '';
            comment.value = '';

            submitButton.disabled = false;

            displayToast('commentSuccess', toast);

            console.log("Comment submitted");
        } else {
            
            displayToast('error', toast);

            const errorData = await response.json();
            console.log("Error:", errorData.message);
        }
    } catch (error) {
        submitButton.disabled = false;
        console.error("Fetch error:", error);
    }
});

