
import { formattedDate } from "./helpers/timeFormatter.js";
import { displayToast } from "../components/toast/toast.js";
import { baseUrl } from "./helpers/url.js";
import {
    validateInputLength,
    validateEmailPattern,
    updateInputError,
    updateEmailError,
    clearInputFields
} from "./helpers/formHelpers.js";

const commentForm = document.querySelector(".blog__conversation-form");
const toast = document.querySelector("#commentsToast");

const name = document.querySelector("#commentName");
const nameError = document.querySelector("#commentNameError");

const email = document.querySelector("#commentEmail");
const emailError = document.querySelector("#commentEmailError");

const comment = document.querySelector("#commentComment");
const commentError = document.querySelector("#commentCommentError");

const submitButton = document.querySelector("#commentSubmit");

let isSubmitButtonPressed = false;

export async function fetchAndDisplayComments() {
    const postId = new URLSearchParams(window.location.search).get('id');
    const commentsSection = document.querySelector('.blog__conversation__comments');

    try {
        const response = await fetch(`${baseUrl()}/comments?post=${postId}`);
        if (response.ok) {
            const comments = await response.json();
            let commentsHTML = '<h3>Comments</h3>';

            if (comments.length === 0) {
                commentsHTML += `<p>There are no comments yet. Start the conversation!</p>`;
            }

            for (const comment of comments) {
                commentsHTML += `
                    <div class="comments__comment">
                        <h4>${comment.author_name}</h4>
                        <time class="fs-xs">${formattedDate(comment.date)}</time>
                        <p>${comment.content.rendered}</p>
                    </div>
                `;
            }

            commentsSection.innerHTML = commentsHTML;
        }
    } catch (error) {
        console.error("Failed to fetch comments:", error);
    }
}

commentForm.addEventListener("submit", validateAndSubmitForm);

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
    let isNameValid = validateInputLength(name, nameError, 0);
    let isEmailValid = validateEmailPattern(email, emailError);
    let isCommentValid = validateInputLength(comment, commentError, 0);

    return isNameValid && isEmailValid && isCommentValid;
}

function updateErrors() {
    updateInputError(name, nameError, 0, isSubmitButtonPressed);
    updateEmailError(email, emailError, isSubmitButtonPressed);
    updateInputError(comment, commentError, 0, isSubmitButtonPressed);
}

async function submitForm() {

    const postId = new URLSearchParams(window.location.search).get('id');

    const formData = JSON.stringify({
        post: postId,
        author_name: name.value,
        author_email: email.value,
        content: comment.value,
    });

    displayToast('waiting', toast);

    try {
        const response = await fetch(`${baseUrl()}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: formData,
        });

        if (response.ok) {
            displayToast('commentSuccess', toast);

            clearInputFields({ "name": name, "email": email, "comment": comment });

            isSubmitButtonPressed = true;
        }
    } catch (error) {
        displayToast('error', toast);
        console.error("Fetch error:", error);
    }
}