document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    // Owner credentials
    const ownerEmail = "anudeepthi@gmail.com";
    const ownerPassword = "KLH@1234";

    if (email === ownerEmail && password === ownerPassword) {
        // Store the credentials in localStorage for future sessions
        localStorage.setItem("loggedInUserEmail", email);
        localStorage.setItem("loggedInUserPassword", password);

        // Redirect to the profile page
        window.location.href = "profile.html";
    } else {
        alert("Invalid credentials! Please try again.");
    }
});