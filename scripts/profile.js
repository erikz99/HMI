window.login = function() {
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    let profiles = JSON.parse(localStorage.getItem("profiles"));

    if(email.value.length === 0){
        email.classList.add("error");
        document.getElementById('error_email').style.display = 'block';
    }else{
        if(profiles[email.value] === undefined || profiles[email.value]["password"] !== password.value){
            email.classList.add("error");
            document.getElementById('error_email').style.display = 'block';
            document.getElementById('error_email').textContent = "Невалиден имейл или парола";
        } else {
            let isDeliveryMan = profiles[email.value]["isDeliveryMan"];
            localStorage.setItem("logged", "1");
            localStorage.setItem("currentEmail", email.value);
            localStorage.setItem("isDeliveryMan", isDeliveryMan);
            window.location.href = window.location.href.replace("login", "index");
        }
    }

    if(password.value.length === 0){
        password.classList.add("error");
        document.getElementById('error_password').style.display = 'block';
    }else{
        password.classList.remove("error");
        document.getElementById('error_password').style.display = 'none';
    }
}

window.register = function() {
    var firstName = document.getElementById("first_name");
    var lastName = document.getElementById("last_name");
    var password = document.getElementById("password");
    var phone = document.getElementById("phone");
    var address = document.getElementById("city");
    var address = document.getElementById("address");
    var email = document.getElementById("email");
    var isDeliveryMan = document.getElementById("is_delivery_man");
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    var emptyCounter = 0;

    if(firstName.value.length === 0){
        firstName.classList.add("error");
        document.getElementById('error_f_name').style.display = 'block';
        emptyCounter++;
    }else{
        firstName.classList.remove("error");
        document.getElementById('error_f_name').style.display = 'none';
    }

    if(lastName.value.length === 0){
        lastName.classList.add("error");
        document.getElementById('error_l_name').style.display = 'block';
        emptyCounter++;
    }else{
        lastName.classList.remove("error");
        document.getElementById('error_l_name').style.display = 'none';
    }

    if(password.value.length === 0){
        password.classList.add("error");
        document.getElementById('error_password').style.display = 'block';
        emptyCounter++;
    }else{
        password.classList.remove("error");
        document.getElementById('error_password').style.display = 'none';
    }
    
    if(phone.value.length === 0){
        phone.classList.add("error");
        document.getElementById('error_phone').style.display = 'block';
        emptyCounter++;
    }else{
        phone.classList.remove("error");
        document.getElementById('error_phone').style.display = 'none';
    }

    if(address.value.length === 0){
        address.classList.add("error");
        document.getElementById('error_city').style.display = 'block';
        emptyCounter++;
    }else{
        address.classList.remove("error");
        document.getElementById('error_city').style.display = 'none';
    }

    if(address.value.length === 0){
        address.classList.add("error");
        document.getElementById('error_address').style.display = 'block';
        emptyCounter++;
    }else{
        address.classList.remove("error");
        document.getElementById('error_address').style.display = 'none';
    }

    if(email.value.length === 0){
        email.classList.add("error");
        document.getElementById('error_email').style.display = 'block';
        emptyCounter++;
    }else{
        if (profiles[email.value] !== undefined ){
            email.classList.add("error");
            document.getElementById('error_email').style.display = 'block';
            document.getElementById('error_email').textContent = "Имейлът вече е регистриран";
        } else {
            email.classList.remove("error");
            document.getElementById('error_email').style.display = 'none';
            if (emptyCounter === 0) {
                if (isDeliveryMan.checked) {
                    isDeliveryMan = "1";
                } else {
                    isDeliveryMan = "0";
                }
                profiles[email.value] = {
                    "password": password.value,
                    "firstName": firstName.value,
                    "lastName": lastName.value,
                    "phone": phone.value,
                    "city": city.value,
                    "address": address.value,
                    "isDeliveryMan": isDeliveryMan
                }
                localStorage.setItem("profiles", JSON.stringify(profiles));
                window.location.href = window.location.href.replace("register", "index");
            }
        }
    }
}

function validateField(field, error_msg){
    if(field.value.length === 0){
        var error_field = document.createElement('div');
        error_field.innerText = error_msg;
        error_field.classList.add("error_field");
        field.parentNode.insertBefore(error_field, field.nextSibling);
    }
}

function profileRedirect(page) {
    if (localStorage.getItem("logged") != 0) {
        if(localStorage.getItem("isDeliveryMan") == 1) {
            window.location.href = window.location.href.replace(page, "profile_deliveryman");
        } else {
            window.location.href = window.location.href.replace(page, "profile");
        }
    } else {
       window.location.href = window.location.href.replace(page, "no_profile");
    }
}

function logout() {
    localStorage.setItem("logged", "0");
    localStorage.setItem("currentEmail", "");
    window.location.href = window.location.href.replace("profile_deliveryman", "login").replace("profile", "login");
}