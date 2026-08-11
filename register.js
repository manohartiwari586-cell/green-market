const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name === "" || email === "" || mobile === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields.");
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter a valid 10-digit mobile number.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        name: name,
        email: email,
        mobile: mobile,
        password: password
    };

    localStorage.setItem("greenMarketUser", JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "login.html";

});