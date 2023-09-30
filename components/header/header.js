document.addEventListener('DOMContentLoaded', () => {
    initHeader();
});

function initHeader() {
    buildHeader();
}

function buildHeader() {
    const header = document.querySelector('#header');
    header.innerHTML = header.innerHTML =
        `<section class="header-content">
            <a href="#" class="menu-toggle">
                <i class="fa-solid fa-bars tc-pri"></i>
            </a>
            <a href="#" class="title">
                <span class="fw-600">putting</span><span class="fw-900">LAB</span>
            </a>
            <input type="search" name="search" id="search" placeholder="Search...">
            <a href="#" class="search-toggle">
                <i class="fa-solid fa-magnifying-glass tc-pri"></i>
            </a>
            <nav>
                <ul>
                    <li><a href="#">home</a></li>
                    <li><a href="#">blogs</a></li>
                    <li><a href="#">contact</a></li>
                </ul>
            </nav>
        </section>`;
}