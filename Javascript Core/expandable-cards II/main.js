let readMoreButtons = document.querySelectorAll('.read-more-button')
let collapses = document.querySelectorAll('.collapsible')

let targetReadMoreButton = null
let targetCollapsible = null
let targetFadeWrapper = null
let targetTextBody = null

const toggleCanViewContent = () => {
    targetReadMoreButton.classList.toggle('d-none')
    targetFadeWrapper.classList.toggle('d-none')
    targetTextBody.classList.toggle('can-scroll')
    targetTextBody.classList.toggle('expand')
}

const setListenerOnCollapsible = (collapsible) => {
    collapsible.addEventListener('toggle', ({ target }) => {
        if (!target.open) {
            let fadeWrapper = target.nextSibling.nextSibling;
            fadeWrapper.classList.add('d-none')
            fadeWrapper.querySelector('button').classList.add('d-none')
            target.querySelector('.body').classList.remove('can-scroll')
            target.querySelector('.body').classList.remove('expand')
        } else {
            let fadeWrapper = target.nextSibling.nextSibling;
            fadeWrapper.classList.remove('d-none')
            fadeWrapper.querySelector('button').classList.remove('d-none')
            target.querySelector('.body').classList.remove('expand')
        }

    })
}

const setTargetValue = (target) => {
    targetReadMoreButton = target
    targetFadeWrapper = target.parentElement
    targetCollapsible = targetFadeWrapper.previousSibling.previousSibling
    targetTextBody = targetCollapsible.querySelector('p.body')

    if (!targetCollapsible.open) {
        targetReadMoreButton.classList.add('d-none')
        targetFadeWrapper.classList.add('d-none')
        targetTextBody.classList.add('can-scroll')
        targetTextBody.classList.add('expand')
    } else {
        toggleCanViewContent()
    }
}

collapses.forEach(collapsible => setListenerOnCollapsible(collapsible))

readMoreButtons.forEach(button => {
    button.addEventListener('click', ({ target }) => {
        setTargetValue(target)
    })
})



