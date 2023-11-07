
import { fetchData } from "./index.js";
import { BlogPost } from "./models/blogPost.js";
import { buildBlogsLoader } from "../components/loaders/loaders.js";

const headerH1 = document.querySelector(".blogs__header-h1");
const headerParagraph = document.querySelector(".blogs__header-p");
const blogsCardsContainer = document.querySelector(".blogs__cards");

const tabs = [...document.querySelectorAll("[id^='tab']")];
const moreButton = document.querySelector("#moreButton");
const baseUrl = "https://wp.erlendjohnsen.com/wp-json/wp/v2/";

let activeTab = 0;
let categoryId = '0';
let perPage = 10;

document.addEventListener('DOMContentLoaded', () => {
    initTabsAndHeader();
});

async function setCards(perPage) {
    blogsCardsContainer.innerHTML = buildBlogsLoader();
    moreButton.disabled = true;
    const posts = await fetchData(baseUrl + `posts?_embed&per_page=${perPage}`, headerParagraph);
    blogsCardsContainer.innerHTML = "";

    posts.forEach(post => {
        if (categoryId === '0' || post.categories[0].toString() === categoryId) {
            const blogPost = BlogPost.fromJson(post);
            const blogCardHtml = `
            <div class="blogs-card">
                <a class="card-flex" href="/pages/blog.html?id=${blogPost.id}">
                    <section class="blogs-card__info">
                        <div>
                            <div class="blogs-card__category mb-1">
                                <p class="tt-up fs-xs">${blogPost.category}</p>
                            </div>
                            <h2 class="fs-m">${blogPost.title}</h2>
                        </div>
                        <div>
                            <p class="fw-700">${blogPost.author}</p>
                            <p>${blogPost.date}</p>
                        </div>
                    </section>
                    <section class="blogs-card__excerpt">
                        <p>${blogPost.excerpt}</p>
                    </section>
                    <section class="blogs-card__img">
                        <img src="${blogPost.featuredImage}" alt="${blogPost.featuredImageAlt}" />
                    </section>
                </a>
            </div>`;
            blogsCardsContainer.innerHTML += blogCardHtml;
        }
    });

    if (activeTab != 0 || posts.length === 12) {
        moreButton.disabled = true;
    } else {
        moreButton.disabled = false;
    }
}

moreButton.addEventListener('click', () => {
    perPage = perPage + 5;
    setCards(perPage);
})


async function initTabsAndHeader() {
    getCategoryId();

    const categories = await fetchData(baseUrl + "categories/", headerParagraph);

    const updateH1 = (index) => {
        const { description } = categories[index];
        headerH1.innerText = tabs[index + 1].innerText;
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
    setCards(perPage);
}

function getCategoryId() {
    categoryId = new URLSearchParams(window.location.search).get('category');
    activeTab = categoryMap[categoryId] || 0;
    toggleTabSelection(activeTab);
}
