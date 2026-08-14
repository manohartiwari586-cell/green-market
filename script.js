let cartCount = 0;

const cartButtons = document.querySelectorAll(".cartBtn");

cartButtons.forEach(button=>{

button.addEventListener("click",function(){

let cart=JSON.parse(localStorage.getItem("cart")) || [];

let product={

name:this.dataset.name,

price:this.dataset.price,

image:this.dataset.image,

qty:1

};

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

cartCount=cart.length;

document.getElementById("cartCount").innerHTML=cartCount;

document.getElementById("floatingCount").innerHTML=cartCount;

alert("✅ Product Added To Cart");

});

});

// ----------------------
// Quantity
// ----------------------

const qtyBoxes=document.querySelectorAll(".qty");

qtyBoxes.forEach(box=>{

let minus=box.children[0];
let number=box.children[1];
let plus=box.children[2];

let qty=1;

plus.onclick=function(){

qty++;

number.innerHTML=qty + " kg";

};

minus.onclick=function(){

if(qty>1){

qty--;

number.innerHTML=qty + " kg";

}

};

});
const dozenBoxes=document.querySelectorAll(".qty-dozen");

dozenBoxes.forEach(box=>{

let minus=box.children[0];
let number=box.children[1];
let plus=box.children[2];

let qty=1;

plus.onclick=function(){

qty++;

number.innerHTML=qty + " Dozen";
};

minus.onclick=function(){

if(qty>1){

qty--;

number.innerHTML=qty + " Dozen";
}
};

});
const litreBoxes=document.querySelectorAll(".qty-litre");

litreBoxes.forEach(box=>{

let minus=box.children[0];
let number=box.children[1];
let plus=box.children[2];

let qty=1;

plus.onclick=function(){

qty++;

number.innerHTML=qty + " L";
};

minus.onclick=function(){

if(qty>1){

qty--;

number.innerHTML=qty + " L";
}
};

});
const pieceBoxes=document.querySelectorAll(".qty-piece");

pieceBoxes.forEach(box=>{

let minus=box.children[0];
let number=box.children[1];
let plus=box.children[2];

let qty=1;

plus.onclick=function(){

qty++;

number.innerHTML=qty + " Piece";
};

minus.onclick=function(){

if(qty>1){

qty--;

number.innerHTML=qty + " Piece";
}
};

});

// ----------------------
// Search
// ----------------------

const search=document.getElementById("search");

search.addEventListener("keyup",function(){

let value=search.value.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let name=card.querySelector("h3").innerHTML.toLowerCase();

if(name.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

// ----------------------
// Category Filter
// ----------------------

const categoryButtons=document.querySelectorAll(".categories button");

categoryButtons.forEach(button=>{

button.addEventListener("click",function(){

categoryButtons.forEach(btn=>btn.classList.remove("active"));

this.classList.add("active");

let category=this.innerText.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let product=card.querySelector("h3").innerText.toLowerCase();

if(category=="all"){

card.style.display="block";

}

else if(category.includes("vegetables")){

if(product=="tomato" || product=="potato" || product=="onion"){

card.style.display="block";

}

else{

card.style.display="none";

}

}

else if(category.includes("fruits")){

if(product=="apple" || product=="banana"){

card.style.display="block";

}

else{

card.style.display="none";

}

}

else if(category.includes("dairy")){

if(product=="milk"){

card.style.display="block";

}

else{

card.style.display="none";

}

}

else{

card.style.display="block";

}

});

});
});

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
this.classList.add("active");

}else{

wishlist.splice(index,1);
this.innerHTML = "♡";
this.classList.remove("active");

}

localStorage.setItem("wishlist", JSON.stringify(wishlist));

});

});

