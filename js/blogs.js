
import { fetchData } from "./index.js";
import { BlogPost } from "./models/blogPost.js";

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
    blogsCardsContainer.innerHTML = '';
    const posts = await fetchData(baseUrl + "posts?_embed", headerParagraph);
    console.log(posts);

    posts.forEach(post => {
        if (categoryId === '0' || post.categories[0].toString() === categoryId) {
            const blogPost = BlogPost.fromJson(post);
            const blogCardHtml = `
            <div class="blogs__cards__card">
                <a class="card-flex" href="/pages/blog.html?id=${blogPost.id}">
                    <section class="left">
                        <div class="blogs__cards__card-category">
                            <p class="tt-up fs-xs">${blogPost.category}</p>
                        </div>
                        <h2 class="fs-m">${blogPost.title}</h2>
                        <p class="fw-700">${blogPost.author}</p>
                        <p>${blogPost.date}</p>
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
        const { name, description } = categories[index];
        headerH1.innerText = name;
        headerParagraph.innerText = description;
    };

    tabs.forEach((tab, i) => {
        if (i === 0) {
            tab.innerText = headerH1.innerText = 'All Blogs';
        } else {
            tab.innerText = categories[i - 1].name;
            if (i === activeTab) updateH1(i - 1);
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
