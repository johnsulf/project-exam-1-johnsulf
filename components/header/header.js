import { buildSearchResults } from "./search.js";

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
});

function initHeader() {
    buildHeader();
    toggleMobileFeature(".menu-open", ".menu-close", "mobile-menu");
    toggleMobileFeature(".search-open", ".search-close", "mobile-search");
    buildSearchResults();
}


function buildHeader() {
    const header = document.querySelector("#header");
    header.innerHTML =
        `<section class="header__content">
            <button class="menu-open" type="button" title="Open Navigation Menu">
                <i class="fa-solid fa-bars tc-pri fs-m"></i>
            </button>
            <a href="/index.html" class="header__content-title">
                <span class="fw-600">putting</span><span class="fw-900">LAB</span>
            </a>
            <div class="header__content-search-container">
                <button class="search-close" type="button" title="Close Search View">
                    <i class="fa-solid fa-close tc-white"></i>
                </button>
                <div class="search-container__input-results">
                    <input type="search" name="search" id="search" placeholder="Search for blogs">
                    <div class="search-container__results p-1"></div>
                </div>    
            </div>
            <button class="search-open" type="button" title="Open Search View">
                <i class="fa-solid fa-magnifying-glass tc-pri fs-m"></i>
            </button>
            <nav class="nav">
                <button class="menu-close" type="button" title="Close Navigation Menu">
                    <i class="fa-solid fa-close tc-white"></i>
                </button>
                <ul>
                    <li><a href="/index.html">Home</a></li>
                    <li><a href="/pages/blogs.html">Blogs</a></li>
                    <li><a href="/pages/contact.html">Contact</a></li>
                    <li><a href="/pages/about.html">About</a></li>
                </ul>
            </nav>
        </section>`;

    const currentPage = window.location.pathname;

    const navLinks = header.querySelectorAll(".nav ul li a");

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.parentElement.classList.add("active");
        }
    });
}

function toggleMobileFeature(openBtnSelector, closeBtnSelector, toggleClass) {
    const openBtn = document.querySelector(openBtnSelector);
    const closeBtn = document.querySelector(closeBtnSelector);
    const mainContent = document.querySelector("main");
    const container = document.querySelector(".header__content");

    function showMobileMenu() {
        container.classList.add(toggleClass);
        closeBtn.classList.add("show");
        mainContent.innerHTML += `<div id="backdrop"></div>`
        if (toggleClass === "mobile-search") {
            document.querySelector("#search").focus();
        }
    }

    function closeMobileMenu() {
        const backdrop = document.getElementById("backdrop");
        container.classList.add("closing");
        backdrop.classList.add("closing");
        setTimeout(() => {
            mainContent.removeChild(backdrop);
            container.classList.remove(toggleClass);
            container.classList.remove("closing");
            closeBtn.classList.remove("show");
        }, 300);
    }

    openBtn.addEventListener("click", () => showMobileMenu());

    closeBtn.addEventListener("click", () => closeMobileMenu());

    mainContent.addEventListener("click", () => {
        if (document.getElementById("backdrop")) {
            closeMobileMenu();
        }
    });

}
