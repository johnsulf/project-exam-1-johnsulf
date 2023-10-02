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
