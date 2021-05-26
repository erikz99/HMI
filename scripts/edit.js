document.getElementById("btn_edit").addEventListener('click', () => {
    let inputs = document.getElementsByTagName("input");

    for (let input of inputs) {
        input.removeAttribute("disabled");
    }
})

