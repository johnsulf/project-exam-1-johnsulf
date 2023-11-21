import { BlogPost } from "../models/blogPost.js";

export function populateBlogCard(post, type = 'latest') {
    const blogPost = BlogPost.fromJson(post);
    let rootElementStart = `<a href="/pages/blog.html?id=${blogPost.id}"`;
    let rootElementEnd = '</a>';
    let classList = 'blog-card bs-1 bg-sec40';
    let contentPadding = 'py-2 px-1';
    let titleSize = 'fs-s';
    let authorSize = 'fs-xs';
    let readButton = '';

    if (type === 'recent') {
        rootElementStart = '<div';
        rootElementEnd = '</div>';
        classList = 'blog-card bg-acc40';
        contentPadding = 'py-3 px-1';
        titleSize = 'fs-m';
        authorSize = 'fs-s';
        readButton = `<a href="/pages/blog.html?id=${blogPost.id}" class="cta">Read</a>`;
    }

    return `${rootElementStart} class="${classList}">
            <img class="blog-card__img" src="${blogPost.featuredImage}" alt="" srcset="">
            <div class="blog-card__content ${contentPadding}">
                <div class="blog-card__content-category">
                    <p class="tt-up fs-xs">${blogPost.category}</p>
                </div>
                <p class="blog-card__content_title ${titleSize} fw-800">
                    ${blogPost.title}
                </p>
                <div class="blog-card__content-bottom">
                    <p class="${authorSize} fw-700">${blogPost.author}</p>
                    <time class="${authorSize}">${blogPost.date}</time>
                    ${readButton}
                </div>
            </div>
        ${rootElementEnd}`;
}
