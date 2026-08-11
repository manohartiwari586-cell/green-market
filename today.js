// ==============================
// TODAY'S DEAL COUNTDOWN
// ==============================

let endTime = new Date();

endTime.setHours(23, 59, 59, 999);


function updateTimer() {

    let now = new Date();

    let difference = endTime - now;

    if (difference <= 0) {

        document.getElementById("timer").innerHTML =
            "Deal Expired";

        return;
    }

    let hours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    let minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    let seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
    );


    hours = String(hours).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    seconds = String(seconds).padStart(2, "0");


    document.getElementById("timer").innerHTML =
        hours + ":" + minutes + ":" + seconds;
}


setInterval(updateTimer, 1000);

updateTimer();



// ==============================
// ADD TO CART
// ==============================

function addToCart(name, price, image) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    let product = {

        name: name,

        price: price,

        image: image,

        qty: 1

    };


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert("✅ " + name + " Added To Cart!");
}