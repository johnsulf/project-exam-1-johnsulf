export function displayToast(context, toast) {

    switch (context) {
        case "waiting":
            toast.classList.remove("border-info", "bg-infoBg", "tc-ter", "show");
            toast.innerHTML = `<h3>Waiting</h3>
                                    <p>Please hold on.</p>
                                    <p>This shouldn't take long.</p>`;

            toast.classList.add("border-info", "bg-infoBg", "tc-ter", "show");

            break;

        case "commentSuccess":
            toast.classList.remove("border-info", "bg-infoBg", "tc-ter", "show");

            toast.innerHTML = `<h3>Success</h3>
                                    <p>Your comment was successfully posted!</p>
                                    <p>It will display as soon as it has been approved by a moderator!</p>
                                    <div class="countdown-line bg-success"></div>`;

            toast.classList.add("border-success", "bg-successBg", "tc-success", "show");

            setTimeout(() => {
                toast.classList.add("closing");
            }, 6000);

            setTimeout(() => {
                toast.classList.remove("border-success", "bg-successBg", "tc-success", "show", "closing");
            }, 6400);

            break;

        case "contactSuccess":
            toast.classList.remove("border-info", "bg-infoBg", "tc-ter", "show");
            toast.innerHTML = `<h3>Success</h3>
                                    <p>Your form was successfully submitted!</p>
                                    <p>Thank you for contacting us!</p>
                                    <div class="countdown-line bg-success"></div>`;

            toast.classList.add("border-success", "bg-successBg", "tc-success", "show");

            setTimeout(() => {
                toast.classList.add("closing");
            }, 6000);

            setTimeout(() => {
                toast.classList.remove("border-success", "bg-successBg", "tc-success", "show", "closing");
            }, 6400);

            break;

        case "error":
            toast.classList.remove("border-info", "bg-infoBg", "tc-ter", "show");
            toast.innerHTML = `<h3>Error</h3>
                                    <p>Oh no! An error has occurred!</p>
                                    <p>Please try again.</p>
                                    <div class="countdown-line bg-error"></div>`;
            toast.classList.add("border-error", "bg-errorBg", "tc-error", "show");

            setTimeout(() => {
                toast.classList.add("closing");
            }, 6000);

            setTimeout(() => {
                toast.classList.remove("border-error", "bg-errorBg", "tc-error", "show", "closing");
            }, 6400);
            break;

        case "formError":
            toast.classList.remove("border-info", "bg-infoBg", "tc-ter", "show");
            toast.innerHTML = `<h3>Error</h3>
                                        <p>There are errors in your form.</p>
                                        <p>Please fix and try again.</p>
                                        <div class="countdown-line bg-error"></div>`;
            toast.classList.add("border-error", "bg-errorBg", "tc-error", "show");

            setTimeout(() => {
                toast.classList.add("closing");
            }, 6000);

            setTimeout(() => {
                toast.classList.remove("border-error", "bg-errorBg", "tc-error", "show", "closing");
            }, 6400);
            break;

        default:
            break;
    }

    if (toast.querySelector(".countdown-line")) {
        const countdownLine = toast.querySelector(".countdown-line");
        countdownLine.style.animation = `countdown 6400ms linear`;
    }

}