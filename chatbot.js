// Get elements

const chatbotBtn = document.getElementById("chatbotBtn");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");

const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");

const chatMessages = document.getElementById("chatMessages");


// Open chatbot

chatbotBtn.addEventListener("click", function() {

    chatbot.style.display = "block";

});


// Close chatbot

closeChat.addEventListener("click", function() {

    chatbot.style.display = "none";

});


// Send message

sendBtn.addEventListener("click", sendMessage);


// Press Enter to send

userInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});


// Main function

function sendMessage() {

    const message = userInput.value.trim();

    if (message === "") {
        return;
    }


    // Show user message

    addUserMessage(message);


    // Clear input

    userInput.value = "";


    // Get bot reply

    setTimeout(function() {

        const reply = getBotReply(message);

        addBotMessage(reply);

    }, 500);

}


// Add user message

function addUserMessage(message) {

    const div = document.createElement("div");

    div.className = "user-message";

    div.innerText = message;

    chatMessages.appendChild(div);

    scrollChat();

}


// Add bot message

function addBotMessage(message) {

    const div = document.createElement("div");

    div.className = "bot-message";

    div.innerText = message;

    chatMessages.appendChild(div);

    scrollChat();

}


// Scroll chat

function scrollChat() {

    chatMessages.scrollTop = chatMessages.scrollHeight;

}


// Quick buttons

function quickMessage(message) {

    userInput.value = message;

    sendMessage();

}


// Bot responses

function getBotReply(message) {

    message = message.toLowerCase();


    // Hello

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey")
    ) {

        return "👋 Hello! Welcome to Green Market. How can I help you?";

    }


    // Products

    if (
        message.includes("product") ||
        message.includes("products")
    ) {

        return "🛍️ You can explore all our products from the Products page.";

    }


    // Deals

    if (
        message.includes("deal") ||
        message.includes("today")
    ) {

        return "🔥 Check our Today's Deals page for the latest offers!";

    }


    // Cart

    if (
        message.includes("cart") ||
        message.includes("buy")
    ) {

        return "🛒 You can view your selected products in the Cart.";

    }


    // Payment

    if (
        message.includes("payment") ||
        message.includes("pay") ||
        message.includes("upi")
    ) {

        return "💳 We support online payment options and other available checkout methods.";

    }


    // Delivery

    if (
        message.includes("delivery") ||
        message.includes("deliver")
    ) {

        return "📦 Your order will be delivered to your provided address.";

    }


    // Return

    if (
        message.includes("return") ||
        message.includes("refund")
    ) {

        return "🔄 For return or refund information, please check our return policy.";

    }


    // Thank you

    if (
        message.includes("thank") ||
        message.includes("thanks")
    ) {

        return "😊 You're welcome! Happy shopping at Green Market!";

    }


    // Default response

    return "🤖 Sorry, I didn't understand that. You can ask me about Products, Deals, Cart, Payment or Delivery.";

}