export function validateInputLength(inputId, errorId, length) {
    const isValid = inputId.value.trim().length > length;
    errorId.style.display = isValid ? "none" : "block";
    inputId.style.border = isValid ? "2px solid var(--color-success)" : "2px solid var(--color-error)";
    return isValid;
}

export function validateEmailPattern(email, errorId) {
    const regEx = /\S+@\S+\.\S+/;
    const hasEmailPattern = regEx.test(email.value);
    errorId.style.display = hasEmailPattern ? "none" : "block";
    email.style.border = hasEmailPattern ? "2px solid var(--color-success)" : "2px solid var(--color-error)";
    return hasEmailPattern;
}

export function updateInputError(inputId, errorId, length, isSubmitted) {
    inputId.addEventListener("input", () => {
        if (!isSubmitted) return;
        const isValid = inputId.value.trim().length > length;
        errorId.style.display = isValid ? "none" : "block";
        inputId.style.border = isValid ? "2px solid var(--color-success)" : "2px solid var(--color-error)";
    });
}

export function updateEmailError(email, errorId, isSubmitted) {
    email.addEventListener("input", () => {
        if (!isSubmitted) return;
        const regEx = /\S+@\S+\.\S+/;
        const hasEmailPattern = regEx.test(email.value);
        errorId.style.display = hasEmailPattern ? "none" : "block";
        email.style.border = hasEmailPattern ? "2px solid var(--color-success)" : "2px solid var(--color-error)";
    });
}

export function clearInputFields({ name, email, subject, message, comment }) {
    const fields = { name, email, subject, message, comment };

    Object.keys(fields).forEach(key => {
        const field = fields[key];
        if (field) {
            field.value = "";
            field.style.border = "none";
        }
    });
}
