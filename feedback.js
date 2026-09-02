let selectedRating = 0;

const ratingMessages = {
    1: "Poor 😞",
    2: "Not Good 😕",
    3: "Good 🙂",
    4: "Very Good 😊",
    5: "Excellent! 🤩"
};


function setRating(rating) {

    selectedRating = rating;

    const stars = document.querySelectorAll(".rating span");

    stars.forEach((star, index) => {

        if (index < rating) {
            star.classList.add("active");
        } else {
            star.classList.remove("active");
        }

    });

    document.getElementById("ratingText").innerText =
        ratingMessages[rating];
}


function submitFeedback() {

    const name =
        document.getElementById("name").value.trim();

    const feedback =
        document.getElementById("feedback").value.trim();


    /* Check Rating */

    if (selectedRating === 0) {

        alert("Please select a rating ⭐");

        return;
    }


    /* Check Feedback */

    if (feedback === "") {

        alert("Please write your feedback.");

        document.getElementById("feedback").focus();

        return;
    }


    /* Success */

    const userName = name === "" ? "Customer" : name;


    alert(
        "Thank you, " + userName + "! 🌿\n\n" +
        "Your feedback has been submitted successfully. ⭐"
    );

    const feedbackType =
    document.getElementById("feedbackType").value;

    if (feedbackType === "") {
    alert("Please select a feedback type.");
    return;
    }

    /* Clear Form */

    document.getElementById("name").value = "";

    document.getElementById("feedback").value = "";

    selectedRating = 0;


    document.querySelectorAll(".rating span")
        .forEach(star => star.classList.remove("active"));


    document.getElementById("ratingText").innerText =
        "Select your rating";
}


/* Back Button */

function goBack() {
    window.location.href = "products.html";
}