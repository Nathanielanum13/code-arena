
function a () {
    this
    console.log("This is Function A")
}

let b = () => {
    console.log("This is Function B")
}

let c = function () {
    console.log("This is Function C")
}

c();