export function buildCategoriesLoader() {
    let categoriesCardLoaderHtml = '';
    for (let i = 0; i < 4; i++) { // Adjust 4 to however many cards you want to display
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
