import { fetchData } from "../../js/index.js";

export async function buildSearchResults() {
    const searchInput = document.querySelector('#search');
    const searchResults = document.querySelector('.search-container__results');

    searchInput.addEventListener('input', () => {
        searchResults.classList.add('show');
    });

    searchInput.addEventListener('focusout', () => {
        searchResults.classList.remove('show');
    });

    searchInput.addEventListener('input', async (event) => {
        const searchTerm = event.target.value.trim();

        if (searchTerm === '') {
            searchResults.innerHTML = '';
            return;
        }

        searchResults.innerHTML = '<p class="ta-center">Searching...</p>';

        const url = `https://wp.erlendjohnsen.com/wp-json/wp/v2/posts/?search=${searchTerm}`;

        const blogs = await fetchData(url, searchResults);

        if (blogs && blogs.length > 0) {
            let resultsHTML = "";
            blogs.forEach(blog => {
                resultsHTML += `<p>${blog.title.rendered}</p>`;
            });
            searchResults.innerHTML = resultsHTML;
        } else {
            searchResults.innerHTML = '<p class="ta-center tc-error">No results...</p>';
        }
    });
}