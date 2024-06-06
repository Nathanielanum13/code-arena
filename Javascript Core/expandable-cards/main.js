let readMoreButton = document.querySelector('#read-more-button')
let fadeWrapper = document.querySelector('#fade-wrapper')
let textBody = document.querySelector('#body')
let collapsible = document.querySelector('#collapsible')

const toggleCanViewContent = () => {
    readMoreButton.classList.toggle('d-none')
    fadeWrapper.classList.toggle('d-none')
    textBody.classList.toggle('can-scroll')
    textBody.classList.toggle('expand')
}
readMoreButton.addEventListener('click', () => {
    toggleCanViewContent()
})

collapsible.addEventListener('toggle', ({ target }) => {
    if (!target.open) {
        readMoreButton.classList.add('d-none')
        fadeWrapper.classList.add('d-none')
        textBody.classList.add('can-scroll')
        textBody.classList.add('expand')
    } else {
        toggleCanViewContent()
    }

})