
document.addEventListener('DOMContentLoaded', () => {
    buildCircleLoader();
});

const circleLoader = document.querySelector('.loading-container');

function buildCircleLoader() {
    circleLoader.innerHTML =
        `<div class="loading-container_loader">
            <p class="fs-xs fw-600">Loading...</p>
            <div class="circle1"></div>
            <div class="circle2"></div>
        </div>`;
}

export function toggleCircleLoader(show, id) {
    if (show) {
        id.classList.remove("hide");
        id.classList.add("show");
    } else {
        id.classList.remove("show");
        id.classList.add("hide");
    }
}

