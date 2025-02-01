document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("admin-login-form");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const adminUsername = "Anudeepthi Swami"; // Change to your actual admin username
        const adminPassword = "KLH@1234"; // Change to your actual password

        const enteredUsername = document.getElementById("admin-username").value.trim();
        const enteredPassword = document.getElementById("admin-password").value.trim();

        if (enteredUsername === adminUsername && enteredPassword === adminPassword) {
            localStorage.setItem("isAdmin", "true");
            alert("Login Successful!");
            window.location.href = "index.html"; // Redirect to home
        } else {
            alert("Invalid credentials!");
        }
    });
});