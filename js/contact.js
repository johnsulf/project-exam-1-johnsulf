
import { displayToast } from "../components/toast/toast.js";
import {
    validateInputLength,
    validateEmailPattern,
    updateInputError,
    updateEmailError,
    clearInputFields
} from "./helpers/formHelpers.js";

const contactForm = document.querySelector(".contact__form__form");
const toast = document.querySelector("#contactToast");

const name = document.querySelector("#contactName");
const nameError = document.querySelector("#contactNameError");

const email = document.querySelector("#contactEmail");
const emailError = document.querySelector("#contactEmailError");

const subject = document.querySelector("#contactSubject");
const subjectError = document.querySelector("#contactSubjectError");

const message = document.querySelector("#contactMessage");
const messageError = document.querySelector("#contactMessageError");

const submitButton = document.querySelector("#contactSubmit");

const url = "https://wp.erlendjohnsen.com/wp-json/contact-form-7/v1/contact-forms/95/feedback";

let isSubmitButtonPressed = false;


contactForm.addEventListener("submit", validateAndSubmitForm);

async function validateAndSubmitForm(event) {

    event.preventDefault();
    submitButton.disabled = true;

    if (!validateForm()) {
        if (isSubmitButtonPressed) {
            displayToast('formError', toast);
        }
        isSubmitButtonPressed = true;
        updateErrors();
    } else {
        try {
            await submitForm();
            displayToast('formSuccess', toast);
        } catch (e) {
            displayToast('formSubmitError', toast);
            console.error('Form submission error:', e);
        }
    }

    submitButton.disabled = false;
}

function validateForm() {
    let isNameValid = validateInputLength(name, nameError, 5);
    let isEmailValid = validateEmailPattern(email, emailError);
    let isSubjectValid = validateInputLength(subject, subjectError, 15);
    let isMessageValid = validateInputLength(message, messageError, 26);

    return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
}

function updateErrors() {
    updateInputError(name, nameError, 5, isSubmitButtonPressed);
    updateEmailError(email, emailError, isSubmitButtonPressed);
    updateInputError(subject, subjectError, 15, isSubmitButtonPressed);
    updateInputError(message, messageError, 26, isSubmitButtonPressed);
}

async function submitForm() {

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
            displayToast('contactSuccess', toast);

            clearInputFields({ "name": name, "email": email, "subject": subject, "message": message });

            isSubmitButtonPressed = true;
        }
    } catch (e) {
        displayToast('error', toast);
        console.error('Error: ' + e);
    }
}
