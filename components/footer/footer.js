document.addEventListener('DOMContentLoaded', () => {
    buildFooter();
});

function buildFooter() {
    const footer = document.querySelector('#footer');
    footer.innerHTML =
        `<nav>
            <ul>
                <li><a href="#" class="tc-white">home</a></li>
                <li><a href="#" class="tc-white">blogs</a></li>
                <li><a href="#" class="tc-white">contact</a></li>
            </ul>
        </nav>
        <p class="mb-1 fs-s">© 2023 puttingLAB, All Rights Reserved</p>`;
}