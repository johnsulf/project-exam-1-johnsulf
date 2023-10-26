
import { fetchData } from "./index.js";
import { BlogPost } from "./models/blogPost.js";
import { buildBlogsLoader } from "../components/loaders/loaders.js";

const headerH1 = document.querySelector(".blogs__header-h1");
const headerParagraph = document.querySelector(".blogs__header-p");
const blogsCardsContainer = document.querySelector(".blogs__cards");

const tabs = [...document.querySelectorAll("[id^='tab']")];
const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/";

let activeTab = 0;
let categoryId = '0';

document.addEventListener('DOMContentLoaded', () => {
    initTabsAndHeader();
});

async function setCards() {
    blogsCardsContainer.innerHTML = buildBlogsLoader();
    const posts = await fetchData(baseUrl + "posts?_embed&page=1", headerParagraph);
    blogsCardsContainer.innerHTML = "";
    posts.forEach(post => {
        if (categoryId === '0' || post.categories[0].toString() === categoryId) {
            const blogPost = BlogPost.fromJson(post);
            const blogCardHtml = `
            <div class="blogs__cards__card">
                <a class="card-flex" href="/pages/blog.html?id=${blogPost.id}">
                    <section class="left">
                        <div>
                            <div class="blogs__cards__card-category mb-1">
                                <p class="tt-up fs-xs">${blogPost.category}</p>
                            </div>
                            <h2 class="fs-m">${blogPost.title}</h2>
                        </div>
                        <div>
                            <p class="fw-700">${blogPost.author}</p>
                            <p>${blogPost.date}</p>
                        </div>
                    </section>
                    <section class="middle">
                        <p>${blogPost.excerpt}</p>
                    </section>
                    <section class="right">
                        <img src="${blogPost.featuredImage}" alt="${blogPost.featuredImageAlt}" />
                    </section>
                </a>
            </div>`;
            blogsCardsContainer.innerHTML += blogCardHtml;
        }
    });
}


async function initTabsAndHeader() {
    getCategoryId();

    const categories = await fetchData(baseUrl + "categories/", headerParagraph);

    const updateH1 = (index) => {
        const { description } = categories[index];
        headerH1.innerText = tabs[index+1].innerText;
        headerParagraph.innerText = description;
    };

    tabs.forEach((tab, i) => {
        if (i != 0) {
            if (i === activeTab) updateH1(i - 1);
        } else {
            headerH1.innerText = 'All Blogs';
        }

        tab.addEventListener('click', () => {
            toggleTabSelection(i);
            if (i === 0) {
                headerH1.innerText = 'All Blogs';
                headerParagraph.innerText = '';
            } else {
                updateH1(i - 1);
            }
        });
    });
}

const categoryMap = {
    '34': 1,
    '32': 2,
    '33': 3,
    '31': 4
};

const reverseCategoryMap = Object.fromEntries(
    Object.entries(categoryMap).map(([key, value]) => [value, key])
);

function toggleTabSelection(index) {
    tabs.forEach(tab => tab.classList.remove("selected"));
    tabs[index].classList.add("selected");
    activeTab = index;

    categoryId = reverseCategoryMap[activeTab] || '0';
    setCards();
}

function getCategoryId() {
    categoryId = new URLSearchParams(window.location.search).get('category');
    activeTab = categoryMap[categoryId] || 0;
    toggleTabSelection(activeTab);
}
