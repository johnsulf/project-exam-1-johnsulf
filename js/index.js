import { toggleLoadingIndicator } from "../components/loader/loader.js";
import { formattedDate } from "./helpers/timeFormatter.js";

const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/"
const postsEmbedUrl = "posts?_embed";
const categoriesUrl = "categories";

const latestPostsContainer = document.querySelector(".latest-posts__posts")
const latestPostsLoader = document.querySelector("#latestPostsLoader")

const categoriesContainer = document.querySelector(".categories__cards")
const categoriesLoader = document.querySelector("#categoriesLoader")

let latestPostsHtml = "";
let categoriesHtml = "";

async function fetchData(url) {
    try {
        
        const response = await fetch(url);
        
        if (response.ok) {
            const json = await response.json();
            toggleLoadingIndicator(false, latestPostsLoader);
            return json;
        } else {
            console.error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
        }
    } catch (e) {
        latestPostsContainer.innerHTML = `<p class="ta-center w-full">Something went wrong...</p>`;
        console.log(e);
    }
    return null;
}

async function populateLatestPosts() {
    toggleLoadingIndicator(true, latestPostsLoader);
    const posts = await fetchData(baseUrl + postsEmbedUrl);
    if (posts) {
        posts.forEach(p => {
            const authorName = p._embedded.author[0].name;
            const categoryName = p._embedded['wp:term'][0][0].name;
            const postImg = p._embedded['wp:featuredmedia'][0];

            latestPostsHtml +=
                `<a href="#" class="blog-card | bs-1 bg-sec40">
                    <img class="blog-card__img" src="${postImg.source_url}" alt="${postImg.alt_text}" srcset="">
                    <div class="blog-card__content | py-2 px-1">
                        <div class="blog-card__content_category">
                            <p class="tt-up fs-xs">${categoryName}</p>
                        </div>
                        <p class="blog-card__content_title | fs-s fw-800">
                            ${p.title.rendered}
                        </p>
                        <div class="blog-card__content_bottom">
                            <p class="fs-xs fw-700">${authorName}</p>
                            <time class="fs-xs">${formattedDate(p.date)}</time>
                        </div>
                    </div>
                </a>`;
        });
        latestPostsContainer.innerHTML = latestPostsHtml;
        toggleLoadingIndicator(false, latestPostsLoader);
    }
}

async function populateCategories() {
    toggleLoadingIndicator(true, categoriesLoader);
    const categories = await fetchData(baseUrl + categoriesUrl);
    if (categories) {
        categories.forEach(c => {
            if (c.name === 'Uncategorized') {
                return;
            }
            categoriesHtml +=
                `<a href="#" class="categories__cards_card">
                    <img class="categories__cards_card__img" src="assets/icons/logo.png" alt="">
                    <p class="categories__cards_card__title | fs-s fw-700 mx-1">${c.name}</p>
                </a>`;
        });
        categoriesContainer.innerHTML = categoriesHtml;
        toggleLoadingIndicator(false, categoriesLoader);
    }
}

populateLatestPosts();
populateCategories();
