let slideWrapper = document.querySelector('.slide-wrapper')
let xPositionBeforeMouseMove = 0
let newXPosition = 0
let slideDifference = 0

const computeSlidePositionEventHandler = (ev) => {
    newXPosition = ev.clientX
    slideDifference = xPositionBeforeMouseMove - newXPosition
}

const clickAndHoldEventHandler = (e) => {
    xPositionBeforeMouseMove = e.clientX
    newXPosition = e.clientX
    slideDifference = 0
    slideWrapper.addEventListener('mousemove', computeSlidePositionEventHandler)
}

const swipe = (direction = 'right') => {
    if (direction === 'right') {
        let newRight = slideWrapper.scrollLeft + 1000
        slideWrapper.scrollTo({
            top: 0,
            left: newRight,
            behavior: 'smooth'
        })
    }
    if (direction === 'left') {
        let newLeft = slideWrapper.scrollLeft - 1000
        slideWrapper.scrollTo({
            top: 0,
            left: newLeft,
            behavior: 'smooth'
        })
    }
}

slideWrapper.addEventListener('mousedown', clickAndHoldEventHandler)
document.body.addEventListener('click', () => {
    slideWrapper.removeEventListener('mousemove', computeSlidePositionEventHandler)
    slideDifference > 0 ? swipe() : slideDifference < 0 ? swipe('left') : null
    slideDifference = 0
})