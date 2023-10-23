export function buildLatestPostsLoader() {
    let latestPostsLoader = '';
    for (let i = 0; i < 4; i++) { 
        latestPostsLoader += `<a href="/pages/blog.html?id=77" class="blog-card loading" style="border: 1px solid var(--clr-pri20);">
                                <div class="blog-card__img" style="background-color: var(--clr-pri20)"></div>
                                <div class="blog-card__content | py-2 px-1">
                                    <p class="blog-card__content_title | fs-s fw-800"></p>
                                    <div class="blog-card__content_bottom">
                                        <p class="line w-25"></p>
                                        <time class="line"></time>
                                    </div>
                                    <div class="load-overlay"></div> 
                                </div>
                            </a>`;
    }
    return latestPostsLoader;
}

export function buildCategoriesLoader() {
    let categoriesCardLoaderHtml = '';
    for (let i = 0; i < 4; i++) { 
        categoriesCardLoaderHtml += `<a href="#" class="categories__cards_card loading">          
                                        <div class="categories__cards_card__img"></div>
                                        <div class="categories__cards_card__title">
                                            <div class="line mx-1"></div>
                                        </div>
                                        <div class="load-overlay"></div>  
                                    </a>`;
    }
    return categoriesCardLoaderHtml;
}

export function buildRecentBlogLoader() {
    let recentBlogLoader = '';
     
    recentBlogLoader += `<div class="blog-card bg-white loading">
                            <div class="blog-card__img" style="background-color: var(--clr-pri20)"></div>
                            <div class="blog-card__content | py-3 px-1">
                                <p class="blog-card__content_title | fs-m fw-800"></p>
                                <div class="blog-card__content_bottom">
                                    <p class="line w-25"></p>
                                    <time class="line"></time>
                                </div>
                                <div class="load-overlay"></div> 
                            </div>
                        </div>`;
    
    return recentBlogLoader;
}

export function buildBlogLoader(cat, header, authDate, content, image) {
    cat.innerHTML = `<p class="line"></p>`;
    header.innerHTML = `<p class="line"></p>`;
    authDate.innerHTML = `<p class="line"></p>`;
    content.innerHTML = `<p class="line"></p>
                        <p class="line mb-1"></p>
                        <p class="line mb-1"></p>
                        <p class="line mb-1"></p>
                        <p class="line mb-1"></p>`;
    image.innerHTML = `<div class="blog-image my-2 h-15" style="background-color: var(--clr-pri20)"></div>`;
}

export function buildBlogsLoader() {
    let blogsLoader = '';
    for (let i = 0; i < 6; i++) { 
        blogsLoader += `<div class="blogs__cards__card">
                        <a class="card-flex" href="#">
                            <section class="left">
                                <div>
                                    <h2 class="fs-m line"></h2>
                                    <h2 class="fs-m line"></h2>
                                    <h2 class="fs-m line"></h2>
                                </div>
                                <div>
                                    <p class="fw-700 line mb-1"></p>
                                </div>
                            </section>
                            <section class="middle">
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                                <p class="line mb-1"></p>
                            </section>
                            <section class="right">
                                <img style="background-color: var(--clr-pri20); border: 1px solid white;" src="" />
                            </section>
                        </a>
                    </div>`;
    }
    return blogsLoader;
}