
document.addEventListener('DOMContentLoaded', () => {
    buildLoadingIndicator();
});

const loadingIndicator = document.querySelector('.loading-container');

function buildLoadingIndicator() {
    loadingIndicator.innerHTML =
        `<div class="loading-container_loader">
            <p class="fs-xs fw-600">Loading...</p>
            <div class="circle1"></div>
            <div class="circle2"></div>
        </div>`;
}

export function toggleLoadingIndicator(show, id) {
    if (show) {
        id.classList.remove("hide");
        id.classList.add("show");
    } else {
        id.classList.remove("show");
        id.classList.add("hide");
    }
}

