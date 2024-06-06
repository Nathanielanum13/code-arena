let selects = document.querySelectorAll("select")

selects.forEach(select => {
    options = select.options
    options = Array.from(options)
    options.forEach(option => {
        if (option.value === select.getAttribute("value")) {
            option.selected = true
        } else {
            option.selected = false
        }
    })
})

setTimeout(() => {
    $.notify("Access granted", "success");
}, 2000)

$("#butt").on("click", function(e) {
    $.notify("Hello World");
})