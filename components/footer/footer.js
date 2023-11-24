document.addEventListener("DOMContentLoaded", () => {
    buildFooter();
});

function buildFooter() {
    const footer = document.querySelector("#footer");
    footer.innerHTML =
        `<nav>
            <ul>
                <li><a href="../index.html" class="tc-white">Home</a></li>
                <li><a href="/pages/blogs.html"" class="tc-white">Blogs</a></li>
                <li><a href="/pages/contact.html" class="tc-white">Contact</a></li>
                <li><a href="/pages/about.html" class="tc-white">About</a></li>
            </ul>
        </nav>
        <p class="mb-1 fs-xs">© 2023 puttingLAB, All Rights Reserved</p>`;
}