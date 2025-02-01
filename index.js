document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("owner-login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const isOwner = localStorage.getItem("isOwner") === "true";

    function updateUI() {
        if (isOwner) {
            document.getElementById("manage-volunteers-link").style.display = "block";
            document.getElementById("assign-tasks-link").style.display = "block";
            loginBtn.style.display = "none";
            logoutBtn.style.display = "block";
        } else {
            document.getElementById("manage-volunteers-link").style.display = "none";
            document.getElementById("assign-tasks-link").style.display = "none";
            loginBtn.style.display = "block";
            logoutBtn.style.display = "none";
        }
    }

    updateUI(); // Apply changes when the page loads

    loginBtn.addEventListener("click", () => {
        const password = prompt("Enter Owner Password:");
        if (password === "KLH@1234") { // Change this to your actual owner password
            localStorage.setItem("isOwner", "true");
            alert("Login successful! You now have access.");
            location.reload();
        } else {
            alert("Incorrect password!");
        }
    });

    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isOwner");
        alert("You have logged out.");
        location.reload();
    });

    // Ensure "Get Started" button is clickable only by the owner
    const getStartedBtn = document.getElementById("get-started-btn");
    if (getStartedBtn) {
        getStartedBtn.addEventListener("click", (event) => {
            if (!localStorage.getItem("isOwner")) {
                event.preventDefault();
                alert("Only the owner can manage volunteers!");
            }
        });
    }
});