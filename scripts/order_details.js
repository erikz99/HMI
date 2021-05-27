const DB = {
    "10056": {
        "date": "22.05.2021",
        "status": "Завършена",
        "address" : "бул. Св. Климент Охридски 10, София",
        "type" : "Купи вместо мен",
        "supplier" : {
            firstName : "Николай",
            secondName: "Георгиев",
        },
        "market" : "Фантастико", 
        "products" : [
            {
                name : "Кока кола",
                quantity : "2L"
            }, 
            {
                name : "Олио Бисер",
                quantity : "1L"
            },
            {
                name : "Банани",
                quantity : "2 kg"
            }
        ], 
        "rating" : 0
    },
    "10055": {
        "date": "22.03.2021",
        "status": "Завършена",
        "address" : "51 блок, Студентски град, София",
        "type" : "Купи вместо мен",
        "supplier" : {
            firstName : "Антон",
            secondName: "Бахов",
        },
        "market" : "Лидл", 
        "products" : [
            {
                name : "Уиски Jameson ",
                quantity : "1L"
            }, 
            {
                name : "Чипс Lays със сол",
                quantity : "215g"
            },
            {
                name : "Минерална вода Банкя",
                quantity : "10L"
            }
        ],
        "rating" : 0
    },
    "10054": {
        "date": "10.06.2021",
        "status": "Завършена",
        "address" : "жк, ulitsa \"Академик Борис Стефанов\" №2, 1083, Студентски град, София",
        "shippingAddress" : "ул. Професор Витали Таджер, блок 8, Студентски град, София",
        "type" : "Вземи и достави",
        "supplier" : {
            firstName : "Икбал",
            secondName: "Расимов",
        },
        "market" : "Еконт", 
        "details" : "Трябва да се получи книгата \"Богат татко, беден татко\" на името на Анатаолий Йорданов.",
        "rating" : 0
    }
};

function write(order, id) {
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
    
    var ratingElement = document.getElementById("stars_container");
    var numberOfStars = 5;
    var rating = localStorage.getItem(`${id}`);
    if (rating == 0) {
        for (var i=0; i<numberOfStars; i++) {
            var starElement = document.createElement("img");
            starElement.setAttribute("id", `star_${i+1}`);
            starElement.setAttribute("src", "img/icons/star_empty_icon.png");
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
        divElementShippingAddr.setAttribute("class","field one-row")
        divElementShippingAddr.innerHTML = 
        `   
            <label for="address">Адрес за доставка:</label>
            <input type="text" name="shipping-address" id="shipping-address" disabled>
        `;
        detailed_data.appendChild(divElementShippingAddr);
        document.getElementById("shipping-address").value = order.shippingAddress;

        var divElementDetails = document.createElement("div");
        divElementDetails.setAttribute("class","field one-row");
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
    var ratingElement = document.getElementById("stars_container");

    for (var i=0; i<rating; i++) {
        var starElement = document.createElement("img");
        starElement.setAttribute("src", "img/icons/star_full_icon.png");
        ratingElement.appendChild(starElement);
    }
}

function rate(event) {
    var star = event.target;
    var starsId = parseInt(star.id.charAt(star.id.length - 1));
    localStorage.setItem(`${id}`, starsId);
    var numberOfStars = 5;

    var ratingElement = document.getElementById("stars_container");
    var ratingElementParent = ratingElement.parentNode;
    ratingElementParent.removeChild(ratingElement);
    ratingElement = document.createElement("div");
    ratingElement.setAttribute("id", "stars_container");
    ratingElementParent.appendChild(ratingElement);

    initRating(starsId);
}

var id = localStorage.getItem("order");

(function() {
    
    if (localStorage.getItem("setRatings")==null) {
        var keys = Object.keys(DB);
        for (var keyId of keys) {
            localStorage.setItem(`${keyId}`, 0);
        }
        localStorage.setItem("setRatings", "true");
    }
    var order = DB[`${id}`];
    write(order, id);
})();