import { buildCategoriesLoader, buildRecentBlogLoader, buildLatestPostsLoader } from "../components/loaders/loaders.js";
import { populateBlogCard } from "./helpers/populateBlogCard.js";
import { fetchData } from "./helpers/fetchData.js";

document.addEventListener("DOMContentLoaded", () => {
    const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/";
    const postsEmbedUrl = "posts?_embed&per_page=20";
    const categoriesUrl = "categories";

    const recentBlogContainer = document.querySelector(".featured__recent-blog");
    const latestPostsContainer = document.querySelector(".latest-posts__posts");
    const categoriesContainer = document.querySelector(".featured__categories-cards");

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
        recentBlogContainer.innerHTML = populateBlogCard(allPosts[0], "recent");
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
        let html = "";
        for (let i = startIndex; i <= endIndex; i++) {
            html += populateBlogCard(allPosts[i], "latest");
        }
        latestPostsContainer.innerHTML = html;
        document.querySelector(".latest-posts__amount p").innerHTML = `<span class="fw-700">${startIndex}-${endIndex}</span> of ${totalPosts}`;
    }

    async function populateCategories() {
        categoriesContainer.innerHTML = buildCategoriesLoader();
        const categories = await fetchData(`${baseUrl}${categoriesUrl}`, categoriesContainer);
        if (categories) {
            categoriesHtml = categories.filter(c => c.name !== "Uncategorized").map(renderCategoryCard).join("");
            categoriesContainer.innerHTML = categoriesHtml;
        }
    }

    function renderCategoryCard(c) {
        return `
        <a href="/pages/blogs.html?category=${c.id}" class="categories-card">
            <img class="categories-card__img" src="assets/icons/logo.png" alt="">
            <p class="categories-card__title fs-s fw-700 mx-1">${c.name}</p>
        </a>`;
    }

    document.querySelector(".fa-angle-left").addEventListener("click", () => {
        if (currentPage > 1) {
            latestPostsContainer.classList.add("changing");
            setTimeout(() => {
                displayPosts(--currentPage);
                latestPostsContainer.classList.remove("changing");
            }, 300);
        }
    });

    document.querySelector(".fa-angle-right").addEventListener("click", () => {
        if (currentPage * postsPerPage < totalPosts) {
            latestPostsContainer.classList.add("changing");
            setTimeout(() => {
                displayPosts(++currentPage)
                latestPostsContainer.classList.remove("changing");
            }, 300);

        }
    },);

    window.addEventListener("resize", checkWindowSize);

    populatePosts();
    populateCategories();
});
