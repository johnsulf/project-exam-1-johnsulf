
import { displayToast } from "../components/toast/toast.js"; 

const contactForm = document.querySelector(".contact__form__form");
const toast = document.querySelector("#contactToast");

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const url = "https://wp.erlendjohnsen.com/wp-json/contact-form-7/v1/contact-forms/95/feedback";
    const name = document.querySelector("#contactName");
    const email = document.querySelector("#contactEmail");
    const subject = document.querySelector("#contactSubject");
    const message = document.querySelector("#contactMessage");

    const formData = new FormData();
    formData.append("your-name", name.value);
    formData.append("your-email", email.value);
    formData.append("your-subject", subject.value);
    formData.append("your-message", message.value);    

    displayToast('waiting', toast);
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            console.log("Contact Form submitted successfully");
            displayToast('contactSuccess', toast);
            
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        } 
    } catch (e) {
        displayToast('error', toast);
        console.error('Error: ' + e);
    }
});

