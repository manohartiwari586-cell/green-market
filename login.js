const passwordInput = document.getElementById("password");
const showBtn = document.getElementById("showPassword");

// Show / Hide Password
showBtn.onclick = function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        showBtn.innerText = "Hide";
    } else {
        passwordInput.type = "password";
        showBtn.innerText = "Show";
    }
};

// Login Validation
document.getElementById("loginBtn").onclick = function () {
    const username = document.getElementById("username").value.trim();
    const passwordValue = passwordInput.value;

    if (!username || !passwordValue) {
        alert("⚠️ Please enter Username and Password");
        return;
    }

    let user;

    try {
        user = JSON.parse(localStorage.getItem("greenMarketUser") || "null");
    } catch (error) {
        user = null;
    }

    if (!user) {
        alert("❌ Account not found. Please register first.");
        return;
    }

    const usernameMatches =
        username.toLowerCase() === user.name.toLowerCase() ||
        username.toLowerCase() === user.email.toLowerCase();

    if (usernameMatches && passwordValue === user.password) {
        localStorage.setItem("userName", user.name);
        alert("✅ Login Successful! Welcome " + user.name);
        window.location.href = "home.html";
    } else {
        alert("❌ Invalid Username/Email or Password!");
    }
};