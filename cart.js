document.addEventListener("DOMContentLoaded", function () {

// =========================
// CART - UNIQUE PRODUCTS
// =========================

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
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

        const price = parseFloat(
            String(
                this.dataset.price ||
                card.querySelector(".offer-price")?.innerText ||
                card.querySelector(".price")?.innerText ||
                "0"
            ).replace(/[^\d.]/g, "")
        ) || 0;

        const image =
            card.querySelector("img")?.getAttribute("src") ||
            this.dataset.image ||
            "";

        if (!name) {
            alert("Product name not found!");
            return;
        }

        // Get selected quantity
        const qtyBox = card.querySelector(
            ".qty, .qty-dozen, .qty-litre, .qty-piece"
        );

        let qty = 1;

        if (qtyBox && qtyBox.children[1]) {
            qty = parseInt(
                qtyBox.children[1].innerText,
                10
            ) || 1;
        }

        let cart = getCart();

        // Generate unique product ID using name, price and image
        const productId = [
            name.trim().toLowerCase(),
            price,
            image
        ].join("|");

        // Find the exact product, not just the same name
        const existingItem = cart.find(function (item) {

            const existingId = item.id || [
                String(item.name || "").trim().toLowerCase(),
                parseFloat(
                    String(item.price || "0").replace(/[^\d.]/g, "")
                ) || 0,
                item.image || ""
            ].join("|");

            return existingId === productId;
        });

        if (existingItem) {

            // Same product: increase quantity
            existingItem.qty =
                (Number(existingItem.qty) || 1) + qty;

        } else {

            // Different product: create a separate cart item
            cart.push({
                id: productId,
                name: name,
                price: price,
                image: image,
                qty: qty
            });

        }

        saveCart(cart);
        updateCartCount();

        alert("✅ " + name + " added to cart!");

    });

});

// Update cart count when the page opens
updateCartCount();

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