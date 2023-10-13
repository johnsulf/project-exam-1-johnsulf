import { fetchData } from "../../js/index.js";
import { BlogPost } from "../../js/models/blogPost.js";

export async function buildSearchResults() {
    const searchInput = document.querySelector('#search');
    const searchResults = document.querySelector('.search-container__results');

    searchInput.addEventListener('focusout', () => {
        searchResults.classList.remove('show-flex');
    });

    searchInput.addEventListener('input', async (event) => {
        searchResults.classList.add('show-flex');
        const searchTerm = event.target.value.trim();

        if (searchTerm === '') {
            searchResults.innerHTML = '';
            return;
        }

        searchResults.innerHTML = '<p class="ta-center tc-white">Searching 🧐</p>';

        const url = `https://wp.erlendjohnsen.com/wp-json/wp/v2/posts?_embed&search=${searchTerm}`;

        const blogs = await fetchData(url, searchResults);

        if (blogs && blogs.length > 0) {
            let resultsHTML = "";
            blogs.forEach(blog => {
                const blogPost = BlogPost.fromJson(blog);
                console.log(blog);
                resultsHTML += `<a href="#" class="search-container__results_result">
                                    <img class="search-container__results_result__img" src="${blogPost.featuredImage}" alt="" srcset="">
                                    <div class="search-container__results_result__content | fs-xs">
                                        <p class="fw-700">${blogPost.title}</p>
                                        <p>${blogPost.category}</p>
                                        <div class="search-container__results_result__content_bottom">
                                            <p>${blogPost.author}</p>
                                            <time>${blogPost.date}</time>
                                        </div>
                                    </div>
                                </a>`;
            });
            searchResults.innerHTML = resultsHTML;
        } else {
            searchResults.innerHTML = '<p class="ta-center tc-white">No results 😔</p>';
        }
    });
}