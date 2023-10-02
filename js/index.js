import { buildCategoriesLoader } from "../components/categoriesLoader/categoriesLoader.js";
import { toggleCircleLoader } from "../components/circleLoader/circleLoader.js";

import { populateBlogCard } from "./helpers/populateBlogCard.js";

const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/"
const postsEmbedUrl = "posts?_embed";
const categoriesUrl = "categories";

const recentBlogContainer = document.querySelector(".recent-blog");

const latestPostsContainer = document.querySelector(".latest-posts__posts");
const latestPostsLoader = document.querySelector("#latestPostsLoader");

const categoriesContainer = document.querySelector(".categories__cards");

let categoriesHtml = "";

export async function fetchData(url, container) {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const json = await response.json();
            return json;
        } else {
            console.error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
    } catch (e) {
        container.innerHTML = `<p class="ta-center w-full">Oops... Something went wrong😞</p>`;
        console.log(e);
    }
    container.innerHTML = `<p class="ta-center w-full">Oops... Something went wrong😞</p>`;
    return null;
}

async function populatePosts() {
    toggleCircleLoader(true, latestPostsLoader);
    const posts = await fetchData(baseUrl + postsEmbedUrl, latestPostsContainer);
    if (posts) {
        let latestPostsHtml = ''; 
        let recentBlogHtml = '';  

        posts.forEach((p, i) => {
            if (i === 0) {
                recentBlogHtml = populateBlogCard(p, 'recent'); 
            } else { 
                latestPostsHtml += populateBlogCard(p, 'latest');
            }
        });

        recentBlogContainer.innerHTML = recentBlogHtml;
        latestPostsContainer.innerHTML = latestPostsHtml;
        toggleCircleLoader(false, latestPostsLoader);
    }
}


async function populateCategories() {
    categoriesContainer.innerHTML = buildCategoriesLoader();
    const categories = await fetchData(baseUrl + categoriesUrl, categoriesContainer);
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
    }
}

populatePosts();
populateCategories();
