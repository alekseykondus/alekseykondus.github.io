
let cart = {}

let carName = ["LAMBORGHINI SIAN", "TESLA ROADSTER", "RENAULT ALPHINE", "CHEVROLET CORVETTE", "MERCEDES AMG ONE", "BUGATTI DIVO",
               "HONDA NSX", "SUBARU BRZ", "AUDIi E-TRON GT", "KIA STINGER", "BMW M4", "BENTLEY BENTAYGA"];
let carPrice = [3600000, 400000, 270000, 110000, 2700000, 5800000, 
                320000, 90000, 205000, 95000, 280000, 710000];

document.onclick = (event) => {
     if (event.target.classList.contains('add-car')) {
          console.log(event.target.id);
          addCar(event.target.id, carName[event.target.id-1], "product-img"+event.target.id, carPrice[event.target.id-1]);
     }
     else if (event.target.classList.contains('plus')) {
          console.log(event.target.id);
          plusFunction(event.target.id);
          saveData();
          changeRenderCart(event.target.id);
     }
     else if (event.target.classList.contains('minus')) {
          console.log(event.target.id);
          minusFunction(event.target.id);
          saveData();
          console.log(JSON.parse(localStorage.getItem('cart')) || []);
          changeRenderCart(event.target.id);
     }
}

function addCar(id, name, classImg, price) {
     if (!cart[id]) {
          cart[id] = {
               "name": name,
               "classImg": classImg,
               "count": 0,
               "price": price,
          };
          plusFunction(id);
          saveData();
          console.log(JSON.parse(localStorage.getItem('cart')) || []);
     }
}

const plusFunction = (id) => {
     cart[id]['count']++;
}

const minusFunction = (id) => {
     if (cart[id]['count'] - 1 == 0) {
          deleteFunction(id);
          return;
     }
     cart[id]['count']--;
}

const deleteFunction = (id) => {
     cart = JSON.parse(localStorage.getItem('cart')) || [];
     delete cart[id];
     if (document.getElementById("cart-div") != undefined)
          document.getElementById("car"+id).remove();
}

function CreateElement (nameElement, idElement, innerText, parentId) {
     let element = document.createElement(nameElement);
     element.id = idElement;
     element.innerText = innerText;
     if (parentId == "body")
          document.body.appendChild(element);
     else
          document.getElementById(parentId).appendChild(element);
     return element;
}

function isEmpty(obj) {
     for(var prop in obj) {
         if(obj.hasOwnProperty(prop))
             return false;
     }
     return true;
 }
const calculateThePrice = () => {
     let result = 0;
     cart = JSON.parse(localStorage.getItem('cart')) || [];
     if (isEmpty(cart))
          console.log("!cart");
     else if (cart.length == 0)
          console.log("!cart");
     else if (!cart)
          console.log("!cart");
     else if (cart == [])
          console.log("!cart");
     else if (cart == {})
          console.log("!cart");
          else 
          console.log("(((");
     for (element in cart) {
          console.log(cart[element]);
          result += cart[element]['count']*cart[element]["price"];
     }
     return result;
}

const renderCart = () => {
     if (document.getElementById("cart-div") == undefined)
          return;
     
     let price = calculateThePrice();
     if (document.getElementById("cart-header") == undefined) {
          cart = JSON.parse(localStorage.getItem('cart')) || [];
          console.log(cart);
          CreateElement("div", "cart-header", "", "cart-div").classList.add("row", "w-100", "ml-0");
          CreateElement("div", "id", "ID", "cart-header").classList.add("col-1", "text-center");
          CreateElement("div", "img", "Фото", "cart-header").classList.add("col-3", "text-center");
          CreateElement("div", "name", "Название машины", "cart-header").classList.add("col-3", "text-center");
          CreateElement("div", "count", "Количество", "cart-header").classList.add("col-3", "text-center");
          CreateElement("div", "price", "Цена", "cart-header").classList.add("col-2", "text-center");

          for (element in cart) {
               CreateElement("div", "car"+element, "", "cart-div").classList.add("row", "w-100", "ml-0", "py-2");
               CreateElement("div", "carId"+element, element, "car"+element).classList.add("col-1", "text-center", "m-auto");
               CreateElement("div", "carImg"+element, "", "car"+element).classList.add("col-3", "product-img", cart[element]["classImg"]);
               CreateElement("div", "carName"+element, cart[element]["name"], "car"+element).classList.add("col-3", "h4", "text-center", "m-auto");
               CreateElement("div", "carCount"+element, "", "car"+element).classList.add("col-3", "text-center", "m-auto");
               CreateElement("button", element, "-", "carCount"+element).classList.add("btn", "btn-secondary", "d-inline", "minus");
               CreateElement("div", "carCountNumber"+element, cart[element]["count"], "carCount"+element).classList.add("d-inline", "mx-2");
               CreateElement("button", element, "+", "carCount"+element).classList.add("btn", "btn-secondary", "d-inline", "plus");
               CreateElement("div", "carPrice"+element, cart[element]["price"]+" $", "car"+element).classList.add("col-2", "text-center", "m-auto");
          }
          CreateElement("div", "totalPrice", "Общая цена: "+price+" $", "cart-div").classList.add("row", "ml-0", "h3", "mt-3", "mx-auto");
          if (!price)
               cartIsEmpty();
     }
}

const cartIsEmpty = () => {
     document.getElementById("totalPrice").remove();
     document.getElementById("cart-header").remove();
     CreateElement("div", "empty-cart", "Корзина пуста", "cart-div").classList.add("row", "w-100", "mx-auto", "font-weight-bolder", "h2", "align-center");
}

const changeTotalPrice = () => {
     let price = calculateThePrice();
     if (price)
          document.getElementById("totalPrice").innerText = "Общая цена: "+price+" $";
     else 
          cartIsEmpty();
}

const changeRenderCart = (id) => {
     cart = JSON.parse(localStorage.getItem('cart')) || [];
     console.log(cart);
     if (document.getElementById("cart-div") == undefined)
          return;
     console.log(id);
     if (document.getElementById("car"+id))
          document.getElementById("carCountNumber"+id).innerText = cart[id]['count'];
     changeTotalPrice();
}

// Сохраняем данные в localStorage
function saveData() {
     localStorage.setItem('cart', JSON.stringify(cart));
     return cart;
 }
 function clearData() {
     cart = {};
     saveData();
     return cart;
 }

 cart = JSON.parse(localStorage.getItem('cart')) || [];
 console.log(JSON.parse(localStorage.getItem('cart')) || []);
 renderCart ();
 //console.log(localStorage.getItem('cart'));
