document.getElementById("btn_next").addEventListener('click', () => {
	var myStorage = window.localStorage;
	
    var firstName = document.getElementById("first_name").value;
	myStorage.setItem('first_name_unr_info', firstName);
    var lastName = document.getElementById("last_name").value;
	myStorage.setItem('last_name_unr_info', lastName);
    var email = document.getElementById("email").value;
	myStorage.setItem('email_unr_info', email);
    var phone = document.getElementById("phone").value;
	myStorage.setItem('phone_unr_info', phone);
	
	window.location.href = window.location.href.replace("addInfForUnregisteredUser", "finalizeOrder");		
})