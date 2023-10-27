
import { displayToast } from "../components/toast/toast.js";
import {
    validateInputLength,
    validateEmailPattern,
    updateInputError,
    updateEmailError,
} from "./helpers/formValidator.js";

const contactForm = document.querySelector(".contact__form__form");
const name = document.querySelector("#contactName");
const nameError = document.querySelector("#contactNameError");
const email = document.querySelector("#contactEmail");
const emailError = document.querySelector("#contactEmailError");
const subject = document.querySelector("#contactSubject");
const subjectError = document.querySelector("#contactSubjectError");
const message = document.querySelector("#contactMessage");
const messageError = document.querySelector("#contactMessageError");

const toast = document.querySelector("#contactToast");

let isSubmitted = false;

function validateContactForm() {
    let isNameValid = validateInputLength(name, nameError, 5);
    let isEmailValid = validateEmailPattern(email, emailError);
    let isSubjectValid = validateInputLength(subject, subjectError, 15);
    let isMessageValid = validateInputLength(message, messageError, 26);

    return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
}

contactForm.addEventListener("submit", async (event) => {
    isSubmitted = true;

    event.preventDefault();

    const url = "https://wp.erlendjohnsen.com/wp-json/contact-form-7/v1/contact-forms/95/feedback";

    validateContactForm();

    if (!validateContactForm()) {

        updateInputError(name, nameError, 5, isSubmitted);
        updateEmailError(email, emailError, isSubmitted);
        updateInputError(subject, subjectError, 15, isSubmitted);
        updateInputError(message, messageError, 26, isSubmitted);

        return;
    } else {

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

                isSubmitted = true;
            }
        } catch (e) {
            displayToast('error', toast);
            console.error('Error: ' + e);
        }
    }
},
);