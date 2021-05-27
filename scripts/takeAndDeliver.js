document.getElementById("btn_next").addEventListener('click', () => {
	var myStorage = window.localStorage;
	
    var takeАddress = document.getElementById("take_address").value;
	myStorage.setItem('take_address', takeАddress);
    var deliveryAddress = document.getElementById("delivery_address").value;
	myStorage.setItem('delivery_address', deliveryAddress);
    var shipmentInfo = document.getElementById("shipment_info").value;
	myStorage.setItem('shipment_info', shipmentInfo);
	var deliveryType;
	
	var radios = document.getElementsByName('deliveryType');

	for (var i = 0, length = radios.length; i < length; i++) {
	  if (radios[i].checked) {
		deliveryType = radios[i].value;
		break;
	  }
	}
	myStorage.setItem('deliveryType', deliveryType);
	
	 if (localStorage.getItem("logged") == 1) {
		window.location.href = window.location.href.replace("takeAndDeliver", "finalizeOrder");
	} else {
		window.location.href = window.location.href.replace("takeAndDeliver", "addInfForUnregisteredUser");
	}
})