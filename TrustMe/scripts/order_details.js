import { DB } from './modules/db.js';

function write(order) {
    var idElement = document.getElementById("id");
    idElement.value = id;
    

    var statusElement = document.getElementById("status");
    statusElement.value = order.status;

    var dateElement = document.getElementById("date");
    dateElement.value = order.date;

    var typeElement = document.getElementById("type");
    typeElement.value = order.type;

    var dateElement = document.getElementById("date");
    dateElement.value = order.date;

    var firstNameElement = document.getElementById("first_name");
    firstNameElement.value = order.supplier.firstName;

    var lastNameElement = document.getElementById("last_name");
    lastNameElement.value = order.supplier.secondName;

    var marketElement = document.getElementById("market");
    marketElement.value = order.market;

    var addressElement = document.getElementById("address");
    addressElement.value = order.address;
    
    var ratingElement = document.getElementsByClassName("stars_container")[0];
    var numberOfStars = 5;
    var rating = localStorage.getItem(`${id}`);
    if (rating == 0) {
        for (var i=0; i<numberOfStars; i++) {
            var starElement = document.createElement("img");
            starElement.setAttribute("id", `star_${i+1}`);
            starElement.setAttribute("src", "../img/icons/star_0.png");
            starElement.addEventListener('click', rate);
            ratingElement.appendChild(starElement);
        }
    } else {
        initRating(rating);
    }

    if (order.type=="Купи вместо мен") {
        var detailed_data = document.getElementById("detailed_data");
        var divElement = document.createElement("div");
        divElement.setAttribute("class", "table-wrapper");
        divElement.innerHTML = 
        `<p>Продукти:</p>
        <table id="products_table">  
            <thead>
                <tr>
                    <th>Име</th>
                    <th>Тегло/брой</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        </div>`;
        detailed_data.appendChild(divElement);

        var productsTable = document.getElementById("products_table").childNodes[1];
        order.products.forEach((product,index) => {
            var node = document.createElement("tr");      
            var name = document.createElement("td");
            var quantity = document.createElement("td");
            name.innerHTML = product.name;
            quantity.innerHTML = product.quantity;
            node.appendChild(name);
            node.appendChild(quantity);
            productsTable.appendChild(node);
        }); 

        
    } else if (order.type=="Вземи и достави") {
        var detailed_data = document.getElementById("detailed_data");

        var divElementShippingAddr = document.createElement("div");
        divElementShippingAddr.setAttribute("class","field one-row-small-screen")
        divElementShippingAddr.innerHTML = 
        `   
            <label for="address">Адрес за доставка:</label>
            <input type="text" name="shipping-address" id="shipping-address" disabled>
        `;
        detailed_data.appendChild(divElementShippingAddr);
        document.getElementById("shipping-address").value = order.shippingAddress;

        var divElementDetails = document.createElement("div");
        divElementDetails.setAttribute("class","field one-row-small-screen");
        divElementDetails.innerHTML = 
        `   
            <label for="address">Детайли:</label>
            <textarea rows="4" cols="70"  id="details" name="details" disabled></textarea>
        `;
        detailed_data.appendChild(divElementDetails);
        document.getElementById("details").value = order.details;
    }
}

function initRating(rating) {
    var deliveryElement = document.getElementById("delivery_data"); 
    var ratingElement = document.createElement("div");
    ratingElement.setAttribute("class", "stars_container");
    deliveryElement.appendChild(ratingElement);

    for (var i=0; i<rating; i++) {
        var starElement = document.createElement("img");
        starElement.setAttribute("src", "../img/icons/star_1.png");
        ratingElement.appendChild(starElement);
    }
}

function rate(event) {
    var star = event.target;
    var starsId = parseInt(star.id.charAt(star.id.length - 1));
    localStorage.setItem(`${id}`, starsId);
    var numberOfStars = 5;

    var ratingElement = document.getElementsByClassName("stars_container")[0];
    ratingElement.parentNode.removeChild(ratingElement);

    initRating(starsId);
}

var id = localStorage.getItem("order");
if (localStorage.getItem("setRatings")==null) {
    var keys = Object.keys(DB);
    for (var keyId of keys) {
        localStorage.setItem(`${keyId}`, 0);
    }
    console.log("Run");
    localStorage.setItem("setRatings", "true");
}
var order = DB[`${id}`];
write(order);
