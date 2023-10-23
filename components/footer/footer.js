document.addEventListener('DOMContentLoaded', () => {
    buildFooter();
});

function buildFooter() {
    const footer = document.querySelector('#footer');
    footer.innerHTML =
        `<nav>
            <ul>
                <li><a href="../index.html" class="tc-white">home</a></li>
                <li><a href="/pages/blogs.html"" class="tc-white">blogs</a></li>
                <li><a href="/pages/contact.html" class="tc-white">contact</a></li>
                <li><a href="/pages/about.html" class="tc-white">about</a></li>
            </ul>
        </nav>
        <p class="mb-1 fs-s">© 2023 puttingLAB, All Rights Reserved</p>`;
}