export function buildLatestPostsLoader() {
    let latestPostsLoader = "";
    for (let i = 0; i < 3; i++) {
        latestPostsLoader += `<a href="/pages/blog.html?id=77" class="blog-card bs-1 loading">
                                <div class="load-overlay"></div> 
                                <div class="blog-card__img" style="background-color: var(--color-primary20)"></div>
                                <div class="blog-card__content py-2 px-1">
                                    <p class="blog-card__content_title fs-s fw-800"></p>
                                    <div class="blog-card__content-bottom">
                                        <p class="line w-25"></p>
                                        <time class="line"></time>
                                    </div>
                                </div>
                            </a>`;
    }
    return latestPostsLoader;
}

export function buildCategoriesLoader() {
    let categoriesCardLoaderHtml = "";
    for (let i = 0; i < 4; i++) {
        categoriesCardLoaderHtml += `<a href="#" class="categories-card loading">  
                                        <div class="load-overlay"></div>          
                                        <div class="categories-card__img"></div>
                                        <div class="categories-card__title">
                                            <div class="line mx-1"></div>
                                        </div>
                                    </a>`;
    }
    return categoriesCardLoaderHtml;
}

export function buildRecentBlogLoader() {
    let recentBlogLoader = "";

    recentBlogLoader += `<div class="blog-card bg-white loading">
                            <div class="load-overlay"></div> 
                            <div class="blog-card__img" style="background-color: var(--color-primary20)"></div>
                            <div class="blog-card__content py-3 px-1">
                                <p class="blog-card__content_title fs-m fw-800"></p>
                                <div class="blog-card__content-bottom">
                                    <p class="line w-25"></p>
                                    <time class="line"></time>
                                </div>
                            </div>
                        </div>`;

    return recentBlogLoader;
}

export function buildBlogLoader(header, image, content) {
    header.innerHTML = `<div class="line loading" style="height: 2rem">
                            <div class="load-overlay"></div>
                        </div>`;
    image.innerHTML = `<div class="blog-image my-2 h-15 loading" style="background-color: var(--color-primary20)">
                            <div class="load-overlay"></div>
                        </div>`;
    let contentHTML = "";
    for (let i = 0; i < 20; i++) {
        contentHTML += `<div class="line loading mb-1"><div class="load-overlay"></div></div>`;
    }
    content.innerHTML = contentHTML;
}

export function buildBlogsLoader() {
    let blogsLoader = "";
    for (let i = 0; i < 6; i++) {
        blogsLoader += `<div class="blogs-card loading">
                        <div class="load-overlay"></div> 
                        <a class="card-flex" href="#">
                            <section class="blogs-card__info">
                                <div>
                                    <h2 class="fs-m line"></h2>
                                    <h2 class="fs-m line"></h2>
                                    <h2 class="fs-m line"></h2>
                                </div>
                                <div>
                                    <p class="fw-700 line mb-1"></p>
                                </div>
                            </section>
                            <section class="blogs-card__excerpt">
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                            </section>
                            <section class="blogs-card__img">
                                <div style="background-color: var(--color-primary20); border: 1px solid white;"></div>
                            </section>
                        </a>
                    </div>`;
    }
    return blogsLoader;
}