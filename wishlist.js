let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let container = document.getElementById("wishlistContainer");

if(wishlist.length==0){

container.innerHTML="<h2 style='text-align:center;'>❤️ Wishlist is Empty</h2>";

}

else{

wishlist.forEach((item,index)=>{

container.innerHTML += `

<div class="card">

<img src="${item.image}">

<h3>${item.name}</h3>

<h2>${item.price}</h2>

<button onclick="addToCart('${item.name}','${item.price}','${item.image}')">
🛒 Add To Cart
</button>

<button onclick="removeItem(${index})">
❌ Remove
</button>

</div>

`;

});

}

function removeItem(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

location.reload();

}

function addToCart(name,price,image){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({

name:name,

price:price.replace("₹",""),

image:image,

qty:1

});

localStorage.setItem("cart",JSON.stringify(cart));

alert("✅ Added To Cart");

}
const hearts = document.querySelectorAll(".wishlist");

hearts.forEach(function(heart){

heart.addEventListener("click",function(){

const card = this.parentElement;

const product = {
name: card.querySelector("h3").innerText,
price: card.querySelector(".offer-price").innerText,
image: card.querySelector("img").src
};

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let index = wishlist.findIndex(item => item.name === product.name);

if(index === -1){

wishlist.push(product);
this.innerHTML = "❤️";

}else{

wishlist.splice(index,1);
this.innerHTML = "♡";

}

localStorage.setItem("wishlist", JSON.stringify(wishlist));

});

});