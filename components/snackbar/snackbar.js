export function displaySnackbar(context, snackbar) {

    switch (context) {
        case "waiting":
            snackbar.classList.remove("border-info", "bg-infoBg", "show");
            snackbar.innerHTML = `<h3>Waiting</h3>
                                    <p>Please hold on.</p>
                                    <p>This shouldn't take long.</p>`;

            snackbar.classList.add("border-info", "bg-infoBg", "show");  

            break;
            
        case "commentSuccess":   
            snackbar.classList.remove("border-info", "bg-infoBg", "show");
       
            snackbar.innerHTML = `<h3>Success</h3>
                                    <p>Your comment was successfully posted!</p>
                                    <p>It will display as soon as it has been approved by a moderator!</p>`;

            snackbar.classList.add("border-success", "bg-successBg", "show");

            setTimeout(() => {
                snackbar.classList.remove("border-success", "bg-successBg", "show");
            }, 6000);

            break;
            
        case "contactSuccess":
            snackbar.classList.remove("border-info", "bg-infoBg", "show");
            snackbar.innerHTML = `<h3>Success</h3>
                                    <p>Your form was successfully submitted!</p>
                                    <p>Thank you for contacting us!</p>`;

            snackbar.classList.add("border-success", "bg-successBg", "show");

            setTimeout(() => {
                snackbar.classList.remove("border-success", "bg-successBg", "show");
            }, 6000);

            break;
            
        case "error":
            snackbar.classList.remove("border-info", "bg-infoBg", "show");
            snackbar.innerHTML = `<h3>Error</h3>
                                    <p>Oh no! An error has occurred!</p>
                                    <p>Please try again.</p>`;
            snackbar.classList.add("border-error", "bg-error20", "show");

            setTimeout(() => {
                snackbar.classList.remove("border-error", "bg-error20", "show");
            }, 6000);
            break;
    
        default:
            break;
    }

}