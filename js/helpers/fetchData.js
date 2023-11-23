export async function fetchData(url, container) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        container.innerHTML = '<p class="ta-center w-full">Oops... Something went wrong😞</p>';
        return null;
    }
}