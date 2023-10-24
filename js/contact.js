const url = "https://wp.erlendjohnsen.com/wp-json/contact-form-7/v1/contact-forms";

async function testApi() {
    const response = await fetch(url);
    const json = await response.json();

    console.log(response);
    console.log(json);
}
