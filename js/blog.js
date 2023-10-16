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
        blogContainer.innerHTML = `<section>
                                        <article class="blog__content">
                                            <section class="blog__content__top-row">
                                                <div class="blog__content__top-row__category">
                                                    <p class="tt-up fs-xs">${blogPost.category}</p>
                                                </div>
                                                <button class="blog-close" onclick="history.back()" type="button" title="Close Blog">
                                                    <i class="fa-solid fa-close tc-primary"></i>
                                                </button>
                                            </section>
                                            <section class="blog__content__content">
                                                <h1>${blogPost.title}</h1>
                                                <p class="fw-700 tc-pri">${blogPost.author} - ${blogPost.date}</p>
                                                <figure class="my-2">
                                                    <img src="${blogPost.featuredImage}" alt="${blogPost.featuredImageAlt}" srcset="">
                                                    <figcaption>${blogPost.featuredImageCaption}</figcaption>
                                                </figure>
                                                <div>${blogPost.content}</div>
                                            </section>
                                        </article>
                                        <section class="blog__conversation">
                                            <h2>Conversation</h2>
                                            <p>Please keep comments respectful and constructive. Let's make this a positive space for everyone!</p>
                                            <h3>Comment</h3>
                                            <form>
                                                <input type="text" id="c-name">
                                                <input type="text" id="comment">
                                                <button class="cta">submit</button>
                                            </form>
                                            <section class="blog__conversation__comments">
                                    
                                            </section>
                                        </section>
                                    </section>`;
    } catch (error) {
        toggleCircleLoader(false, blogLoader)
        console.log("Error fetching blog:", error);
    }
});