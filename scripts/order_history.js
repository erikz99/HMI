let rows = document.getElementsByClassName("history-row");
for (let row of rows) {
    row.onclick = function() {
        let orderId = row.getElementsByClassName("id")[0].textContent;
        localStorage.setItem('order', orderId);
        window.location.href = window.location.href.replace("order_history", "order_details");
    }
}

