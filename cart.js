document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // CART
    // =========================

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function updateCartCount() {
        const cart = getCart();

        const totalCount = cart.reduce(function (total, item) {
            return total + (Number(item.qty) || 1);
        }, 0);

        document.querySelectorAll("#cartCount, #floatingCount")
            .forEach(function (element) {
                element.innerText = totalCount;
            });
    }

    const cartButtons = document.querySelectorAll(".cartBtn");

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const card = this.closest(".card, .product-card");

            if (!card) {
                alert("Product card not found!");
                return;
            }

            const name =
                this.dataset.name ||
                card.querySelector("h3")?.innerText.trim();

            const price =
                this.dataset.price ||
                card.querySelector(".offer-price, .price")?.innerText
                    .replace(/[^\d.]/g, "");

            const image =
                this.dataset.image ||
                card.querySelector("img")?.src ||
                "";

            if (!name) {
                alert("Product name not found!");
                return;
            }

            // Read selected quantity
            const qtyBox = card.querySelector(
                ".qty, .qty-dozen, .qty-litre, .qty-piece"
            );

            let qty = 1;

            if (qtyBox) {
                const quantityElement = qtyBox.children[1];

                if (quantityElement) {
                    qty = parseInt(quantityElement.innerText, 10) || 1;
                }
            }

            let cart = getCart();

            // Check whether this product already exists
            const existingItem = cart.find(function (item) {
                return item.name === name;
            });

            if (existingItem) {

                existingItem.qty =
                    (Number(existingItem.qty) || 1) + qty;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    image: image,
                    qty: qty
                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            alert(
                "✅ " + name +
                " (" + qty + ") added to cart!"
            );

        });

    });

    // Display saved cart count when page opens
    updateCartCount();


    // =========================
    // QUANTITY CONTROLS
    // =========================

    function setupQuantity(selector, unit) {

        const quantityBoxes = document.querySelectorAll(selector);

        quantityBoxes.forEach(function (box) {

            const minus = box.children[0];
            const number = box.children[1];
            const plus = box.children[2];

            if (!minus || !number || !plus) {
                return;
            }

            let qty = parseInt(number.innerText, 10) || 1;

            function updateQuantity() {
                number.innerText = qty + unit;
            }

            plus.addEventListener("click", function (event) {
                event.preventDefault();

                qty++;
                updateQuantity();
            });

            minus.addEventListener("click", function (event) {
                event.preventDefault();

                if (qty > 1) {
                    qty--;
                    updateQuantity();
                }
            });

            updateQuantity();

        });

    }

    setupQuantity(".qty", " kg");
    setupQuantity(".qty-dozen", " Dozen");
    setupQuantity(".qty-litre", " L");
    setupQuantity(".qty-piece", " Piece");


    // =========================
    // SEARCH
    // =========================

    const search = document.getElementById("search");

    if (search) {

        search.addEventListener("input", function () {

            const value = search.value.toLowerCase().trim();

            const cards = document.querySelectorAll(".card");

            cards.forEach(function (card) {

                const heading = card.querySelector("h3");

                if (!heading) return;

                const name = heading.innerText.toLowerCase();

                card.style.display =
                    name.includes(value) ? "" : "none";

            });

        });

    }


    // =========================
    // CATEGORY FILTER
    // =========================

    const categoryButtons =
        document.querySelectorAll(".categories button");

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const category = this.innerText.toLowerCase().trim();

            const cards = document.querySelectorAll(".card");

            cards.forEach(function (card) {

                const heading = card.querySelector("h3");

                if (!heading) return;

                const product = heading.innerText.toLowerCase().trim();

                let show = true;

                if (category === "all") {

                    show = true;

                } else if (category.includes("vegetables")) {

                    show = ["tomato", "potato", "onion"]
                        .includes(product);

                } else if (category.includes("fruits")) {

                    show = ["apple", "banana"].includes(product);

                } else if (category.includes("dairy")) {

                    show = product === "milk";

                }

                card.style.display = show ? "" : "none";

            });

        });

    });


    // =========================
    // WISHLIST
    // =========================

    const hearts = document.querySelectorAll(".wishlist");

    hearts.forEach(function (heart) {

        const card = heart.closest(".card, .product-card");

        if (!card) return;

        const name = card.querySelector("h3")?.innerText.trim();

        let wishlist = JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];

        // Restore saved wishlist icon
        const alreadySaved = wishlist.some(function (item) {
            return item.name === name;
        });

        if (alreadySaved) {
            heart.innerHTML = "❤️";
            heart.classList.add("active");
        }

        heart.addEventListener("click", function () {

            const product = {
                name: name,
                price:
                    card.querySelector(".offer-price")?.innerText ||
                    card.querySelector(".price")?.innerText ||
                    "",
                image: card.querySelector("img")?.src || ""
            };

            let savedWishlist = JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

            const index = savedWishlist.findIndex(function (item) {
                return item.name === product.name;
            });

            if (index === -1) {

                savedWishlist.push(product);

                this.innerHTML = "❤️";
                this.classList.add("active");

            } else {

                savedWishlist.splice(index, 1);

                this.innerHTML = "♡";
                this.classList.remove("active");

            }

            localStorage.setItem(
                "wishlist",
                JSON.stringify(savedWishlist)
            );

        });

    });

});