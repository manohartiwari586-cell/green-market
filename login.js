// Show / Hide Password

const password = document.getElementById("password");
const showBtn = document.getElementById("showPassword");

showBtn.onclick = function () {

    if (password.type === "password") {
        password.type = "text";
        showBtn.innerHTML = "Hide";
    } else {
        password.type = "password";
        showBtn.innerHTML = "Show";
    }

};

// Login

document.getElementById("loginBtn").onclick = function () {

    let username = document.getElementById("username").value.trim();
    let passwordValue = document.getElementById("password").value.trim();

    if (username === "" || passwordValue === "") {
        alert("⚠️ Please enter Username and Password");
        return;
    }

    // Registered user
    let user = JSON.parse(localStorage.getItem("greenMarketUser"));

    if (user === null) {
        alert("❌ No account found. Please register first.");
        window.location.href = "register.html";
        return;
    }

    // Login Validation
    if (
        (username === user.name || username === user.email) &&
        passwordValue === user.password
    ) {

        localStorage.setItem("userName", user.name);

        alert("✅ Login Successful!\nWelcome " + user.name);

        window.location.href = "home.html";

    } else {

        alert("❌ Invalid Username/Email or Password");

    }

};
const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (username === savedUsername && password === savedPassword) {
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid Username or Password!");
    }
});