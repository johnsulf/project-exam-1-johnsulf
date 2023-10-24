import { BlogPost } from "./models/blogPost.js";
import { buildBlogLoader } from "../components/loaders/loaders.js";
import { formattedDate } from "./helpers/timeFormatter.js";

const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2";

const blogCategory = document.querySelector(".blog-category");
const blogHeader = document.querySelector(".blog-header");
const blogAuthorDate = document.querySelector(".blog-author-date");
const blogImage = document.querySelector(".blog-image");
const blogContent = document.querySelector(".blog-content");

let blog;

document.addEventListener('DOMContentLoaded', () => {
    fetchBlogData();
    fetchAndDisplayComments();
});

async function fetchBlogData() {
  buildBlogLoader(blogCategory, blogHeader, blogAuthorDate, blogImage, blogContent);

    let description = document.head.children[3].content;
    const id = new URLSearchParams(window.location.search).get('id');

    try {
        const response = await fetch(`${baseUrl}/posts/${id}?_embed`);
        blog = await response.json();
        const blogPost = BlogPost.fromJson(blog);

        console.log("Blog: ", blog);

        document.title += ` ${blogPost.title}`;
        description = blogPost.excerpt;
         blogCategory.innerHTML = `${blogPost.category}`;
        blogHeader.innerHTML = `${blogPost.title}`;
        blogAuthorDate.innerHTML = `${blogPost.author} - ${blogPost.date}`;
        blogContent.innerHTML = `${blogPost.content}`;
        blogImage.innerHTML = `<img 
                                    src="${blogPost.featuredImage}" 
                                    alt="${blogPost.featuredImageAlt}"
                                    srcset="">
                                <figcaption>${blogPost.featuredImageCaption}</figcaption>`; 
 
    } catch (error) {
        console.log("Error fetching blog:", error);
    }
}

async function fetchAndDisplayComments() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const commentsSection = document.querySelector('.blog__conversation__comments');

    try {
        const response = await fetch(`${baseUrl}/comments?post=${postId}`);
        if (response.ok) {
            const comments = await response.json();
            let commentsHTML = '<h3>Comments</h3>';

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
    const name = document.querySelector("#cName");
    const email = document.querySelector("#cEmail");
    const comment = document.querySelector("#cComment");
    const submitButton = document.querySelector(".cta");

    const responseContainer = document.querySelector(".blog__conversation__response");

    const payload = JSON.stringify({
        post: postId,
        author_name: name.value,
        author_email: email.value,
        content: comment.value,
    });

    submitButton.disabled = true;

    try {
        const response = await fetch(`${baseUrl}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
        });

        if (response.ok) {
            fetchAndDisplayComments();
            name.value = '';
            email.value = '';
            comment.value = '';

            submitButton.disabled = false;

            responseContainer.innerHTML = `<h3>Success</h3>
                                            <p>Your comment was successfully posted!</p>
                                            <p>Thank you for joining the conversation!</p>`;
            responseContainer.classList.add("border-success", "bg-success20", "show");

            setTimeout(() => {
                responseContainer.classList.remove("border-success", "bg-success20", "show");
            }, 6000);

            console.log("Comment submitted");
        } else {
            responseContainer.innerHTML = `<h3>Error</h3>
                                            <p>Oh no! An error has occurred!</p>
                                            <p>Please try again.</p>`;
            responseContainer.classList.add("border-error", "bg-error20", "show");

            setTimeout(() => {
                responseContainer.classList.remove("border-error", "bg-error20", "show");
            }, 6000);
            const errorData = await response.json();
            console.log("Error:", errorData.message);
        }
    } catch (error) {
        submitButton.disabled = false;
        console.error("Fetch error:", error);
    }
});

