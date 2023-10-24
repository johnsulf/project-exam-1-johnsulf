import { buildCategoriesLoader, buildRecentBlogLoader, buildLatestPostsLoader } from "../components/loaders/loaders.js";
import { populateBlogCard } from "./helpers/populateBlogCard.js";

export async function fetchData(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        container.innerHTML = '<p class="ta-center w-full">Oops... Something went wrong😞</p>';
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/";
    const postsEmbedUrl = "posts?_embed";
    const categoriesUrl = "categories";

    const recentBlogContainer = document.querySelector(".recent-blog");
    const latestPostsContainer = document.querySelector(".latest-posts__posts");
    const categoriesContainer = document.querySelector(".categories__cards");

    let categoriesHtml = "";
    let currentPage = 1;
    const postsPerPage = 3;
    let totalPosts = 0;
    let allPosts = [];

    function checkWindowSize() {
        window.innerWidth < 700 ? displayAllPosts() : displayPosts();
    }

    async function populatePosts() {
        recentBlogContainer.innerHTML = buildRecentBlogLoader();
        latestPostsContainer.innerHTML = buildLatestPostsLoader();
        const posts = await fetchData(`${baseUrl}${postsEmbedUrl}`, latestPostsContainer);
        if (posts) {
            initializePosts(posts);
            checkWindowSize();
        }
    }

    function initializePosts(posts) {
        allPosts = posts;
        totalPosts = posts.length - 1;
        recentBlogContainer.innerHTML = populateBlogCard(allPosts[0], 'recent');
    }

    function displayPosts() {
        updateLatestPostsHtml(getPostRange(currentPage, postsPerPage));
    }

    function displayAllPosts() {
        updateLatestPostsHtml([1, totalPosts]);
    }

    function getPostRange(currentPage, postsPerPage) {
        const startIndex = (currentPage - 1) * postsPerPage + 1;
        const endIndex = Math.min(startIndex + postsPerPage - 1, totalPosts);
        return [startIndex, endIndex];
    }

    function updateLatestPostsHtml([startIndex, endIndex]) {
        let html = '';
        for (let i = startIndex; i <= endIndex; i++) {
            html += populateBlogCard(allPosts[i], 'latest');
        }
        latestPostsContainer.innerHTML = html;
        document.querySelector('.latest-posts__amount p').innerHTML = `<span class="fw-700">${startIndex}-${endIndex}</span> of ${totalPosts}`;
    }

    async function populateCategories() {
        categoriesContainer.innerHTML = buildCategoriesLoader();
        const categories = await fetchData(`${baseUrl}${categoriesUrl}`, categoriesContainer);
        if (categories) {
            categoriesHtml = categories.filter(c => c.name !== 'Uncategorized').map(renderCategoryCard).join('');
            categoriesContainer.innerHTML = categoriesHtml;
        }
    }

    function renderCategoryCard(c) {
        return `
        <a href="/pages/blogs.html?category=${c.id}" class="categories__cards_card">
            <img class="categories__cards_card__img" src="assets/icons/logo.png" alt="">
            <p class="categories__cards_card__title | fs-s fw-700 mx-1">${c.name}</p>
        </a>`;
    }

    document.querySelector('.fa-angle-left').addEventListener('click', () => currentPage > 1 && displayPosts(--currentPage));
    document.querySelector('.fa-angle-right').addEventListener('click', () => currentPage * postsPerPage < totalPosts && displayPosts(++currentPage));
    window.addEventListener('resize', checkWindowSize);

    populatePosts();
    populateCategories();
});
