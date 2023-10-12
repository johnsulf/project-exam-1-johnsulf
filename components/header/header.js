import { buildSearchResults } from "./search.js";

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});

function initHeader() {
    buildHeader();
    toggleMobileFeature('.menu-open', '.menu-close', '.header-content', 'mobile-menu');
    toggleMobileFeature('.search-open', '.search-close', '.header-content', 'mobile-search');
    buildSearchResults();
}


function buildHeader() {
    const header = document.querySelector('#header');
    header.innerHTML =
        `<section class="header-content">
            <button class="menu-open" type="button" title="Open Navigation Menu">
                <i class="fa-solid fa-bars tc-pri"></i>
            </button>
            <a href="#" class="title">
                <span class="fw-600">putting</span><span class="fw-900">LAB</span>
            </a>
            <div class="search-container">
                <button class="search-close" type="button" title="Close Search View">
                    <i class="fa-solid fa-close tc-white"></i>
                </button>
                <div class="search-container__input-results">
                    <input type="search" name="search" id="search" placeholder="Search for blog titles">
                    <div class="search-container__results | p-2"></div>
                </div>    
            </div>
            <button class="search-open" type="button" title="Open Search View">
                <i class="fa-solid fa-magnifying-glass tc-pri"></i>
            </button>
            <nav class="nav">
                <button class="menu-close" type="button" title="Close Navigation Menu">
                    <i class="fa-solid fa-close tc-white"></i>
                </button>
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#">blogs</a></li>
                    <li><a href="#">contact</a></li>
                </ul>
            </nav>
        </section>`;
}

function toggleMobileFeature(openBtnSelector, closeBtnSelector, containerSelector, toggleClass) {
    const openBtn = document.querySelector(openBtnSelector);
    const closeBtn = document.querySelector(closeBtnSelector);
    const container = document.querySelector(containerSelector);

    openBtn.addEventListener('click', () => {
        container.classList.add(toggleClass);
        closeBtn.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        container.classList.remove(toggleClass);
        closeBtn.classList.remove('show');
    });
}
