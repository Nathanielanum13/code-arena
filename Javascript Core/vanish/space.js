class Space {
    constructor(el, options = { x, y }) {
        this.x = options.x
        this.y = options.y

        el.style.position = "absolute";
        el.style.top = this.y + 'px'
        el.style.left = this.x + 'px'
        el.style.border = '1px solid red'
        el.style.padding = '2rem'
        el.style.transition = 'all .5s ease'

        // Make el draggable
        el.setAttribute("draggable", "true")
        const els = document.getElementById("foo")
        el.addEventListener("drag", (evt) => {
            console.log(evt, 'Sad')
            // console.log('x:', clientX, ' y: ', clientY) { clientX, clientY }
            // el.style.top = clientY + 'px'
            // el.style.left = clientX + 'px'
        })

    }
}