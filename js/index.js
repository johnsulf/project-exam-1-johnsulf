import { toggleLoadingIndicator } from "../components/loader/loader.js";

const url = "https://wp.erlendjohnsen.com/wp-json/wp/v2/posts?_embed";
const latestPostsContainer = document.querySelector(".latest-posts__posts")
const latestPostsLoader = document.querySelector("#latestPostsLoader")

let html = "";

async function fetchPosts() {
    try {
        toggleLoadingIndicator(true, latestPostsLoader);

        const response = await fetch(url);
        const json = await response.json();

        json.forEach(e => {
            const authorName = e._embedded.author[0].name;
            const categoryName = e._embedded['wp:term'][0][0].name;

            html +=
                `<div class="blog-card | bs-1">
                <img class="blog-card__img | h-10" src="assets/images/man_1.png" alt="" srcset="">
                <div class="blog-card__content | bg-sec40 py-2 px-1">
                    <div class="blog-card__content_category">
                        <p class="tt-up fs-xs">${categoryName}</p>
                    </div>
                    <p class="blog-card__content_title | fs-s fw-800">
                        ${e.title.rendered}
                    </p>
                    <div class="blog-card__content_bottom">
                        <p class="fs-xs fw-700">${authorName}</p>
                        <p class="fs-xs">${e.date}</p>
                    </div>
                </div>
            </div>`;
        },
        );
        latestPostsContainer.innerHTML = html;
        toggleLoadingIndicator(false, latestPostsLoader);

    } catch (e) {
        toggleLoadingIndicator(false, latestPostsLoader);
        latestPostsContainer.innerHTML = `<p class="ta-center w-full">Something went wrong...</p>`;
        console.log(e);
    }
}


fetchPosts();