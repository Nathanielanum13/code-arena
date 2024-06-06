import Duration from "./djuration.js"
import { darkTheme, lightTheme } from "./themes.js"

let tasks = []
tasks = loadTasks()

let todoCounter = 0
let inProgressCounter = 0
let onHoldCounter = 0
let doneCounter = 0

let activeTaskId;
let activeArea;

const paintTasks = (tasks = []) => {
    resetDefault()
        // Save current task to localStorage
    saveTasks(tasks)
    tasks.forEach(task => {
        if (task.status === "todo") paintTodoTask(task)
        if (task.status === "in-progress") paintInProgressTask(task)
        if (task.status === "on-hold") paintOnHoldTask(task)
        if (task.status === "done") paintDoneTask(task)
    })

    // Rebind drag [start | end] to card elements
    document.querySelectorAll("div.card").forEach(task => {
        task.addEventListener("dragstart", () => dragStartFunc(task))
        task.addEventListener("dragend", () => dragEndFunc(task))
    })

    // Re-adds events listeners to all remove buttons
    document.querySelectorAll(".remove").forEach(removeButton => {
        removeButton.addEventListener("click", () => removeTaskFunc(removeButton))
    })

    // Re-adds events listeners to all ship to next buttons
    document.querySelectorAll(".ship-to-next").forEach(shipToNextButton => {
        shipToNextButton.addEventListener("click", () => shipToNextFunc(shipToNextButton))
    })
}

const paintTodoTask = (task) => {
    todoCounter = todoCounter + 1
    document.querySelector("#todo-count").innerHTML = `${todoCounter} Tasks`
    const todoBody = document.querySelector("#todo-body")
    todoBody.appendChild(cardGenerator(task))
}

const paintInProgressTask = (task) => {
    inProgressCounter = inProgressCounter + 1
    document.querySelector("#in-progress-count").innerHTML = `${inProgressCounter} Tasks`
    const inProgressBody = document.querySelector("#in-progress-body")
    inProgressBody.appendChild(cardGenerator(task))
}

const paintOnHoldTask = (task) => {
    onHoldCounter = onHoldCounter + 1
    document.querySelector("#on-hold-count").innerHTML = `${onHoldCounter} Tasks`
    const onHoldBody = document.querySelector("#on-hold-body")
    onHoldBody.appendChild(cardGenerator(task))
}

const paintDoneTask = (task) => {
    doneCounter = doneCounter + 1
    document.querySelector("#done-count").innerHTML = `${doneCounter} Tasks`
    const doneBody = document.querySelector("#done-body")
    doneBody.appendChild(cardGenerator(task, false))
}

const cardGenerator = (task, showShipButton = true) => {
        const newTask = document.createElement("div")
        newTask.setAttribute("class", `card ${task.status}`)
        newTask.setAttribute("key", `${task.id}`)
        newTask.setAttribute("draggable", "true")

        newTask.innerHTML =
            `
        <h4 class="card-title">
            ${task.taskTitle}<span class="move">:</span>
        </h4>
        <p class="text card-text">
            ${task.taskDescription}
        </p>
        ${showShipButton ? `
        <span class="ship-to-next" current-status="${task.status}" id="${task.id}">
            Ship to next
        </span>` : ``}
        <span id="${task.id}" class="remove ${showShipButton ? '' : 'only'}">Remove</span>
        <div class="card-footer">
        ${task.status === "done" 
        ? `<h5 class="text">Done in ${new Duration(dateParser(task.doneOn) - dateParser(task.inProgressOn)).formatAll(" ")}</h6>` 
        : `<h5 class="text">${task.createdOn}</h6>`}
        </div>
    `

    return newTask
}

paintTasks(tasks)

// Draging
let allTasks = document.querySelectorAll("div.card")
let allTabBodies = document.querySelectorAll("div.tab-body")

allTasks.forEach(task => {
    task.addEventListener("dragstart", () => dragStartFunc(task))
    task.addEventListener("dragend", () => dragEndFunc(task))
})

allTabBodies.forEach(tabBody => {
    tabBody.addEventListener("dragover", (e) => {
        e.preventDefault()
        const activeTask = document.querySelector("div.card.dragging")
        const elementBelowMousePointer = getElementBelowMousePointer
            (tabBody, e.clientY)

        if (elementBelowMousePointer === null) {
            tabBody.appendChild(activeTask)
        } else {
            tabBody.insertBefore(activeTask, elementBelowMousePointer)
        }

        activeTaskId = parseInt(activeTask.getAttribute("key"))
        activeArea = tabBody.getAttribute("area")
        // updatedTasks = updateTaskStatus(activeTaskId, area)
    })
})

const getElementBelowMousePointer = (tabBody, y) => {
    const draggableElements = [...tabBody.querySelectorAll("div.card:not(.dragging)")]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element
}

const updateTaskStatus = (id, area) => {
    if (id === undefined || area === undefined) return [...tasks]
    return tasks.map(task => {
        if (task.id === id) {
            return { ...task, status: `${area}`, inProgressOn: area === "in-progress" ? getNowDate() : task.inProgressOn, doneOn: area === "done" ? getNowDate() : task.doneOn }
        } else {
            return { ...task }
        }
    })
}

const dragStartFunc = (task) => task.classList.add("dragging")

const dragEndFunc = (task) => {
    task.classList.remove("dragging")
    tasks = updateTaskStatus(activeTaskId, activeArea)
    paintTasks(tasks)
}

function resetDefault() {
    document.querySelectorAll("div.tab-body").forEach(tabBody => tabBody.innerHTML = `<!-- Some Code -->`)

    todoCounter = 0
    inProgressCounter = 0
    onHoldCounter = 0
    doneCounter = 0

    document.querySelectorAll(".tab-header-text.text").forEach(counterParagraph => {
        counterParagraph.innerHTML = '0 Tasks'
    })
}

// Create Task section
const createButton = document.querySelector("#create-button")
const createTaskContainer = document.querySelector("#create-new-task")
const closeButton = document.querySelector("#close-button")
const createTaskForm = document.querySelector("#create-task-form")
const createTaskInputField = document.querySelector("#task-title")
const createTaskTextAreaField = document.querySelector("#task-description")
let isCreatingTask = false

// Event listeners for createButton
createButton.addEventListener("click", () => toggleCreateTask())
closeButton.addEventListener("click", () => toggleCreateTask())
createTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = e.target[0].value
    const description = e.target[1].value

    // console.log(`title:: ${title} , description:: ${description}`);

    createNewTask(title, description)
})

const toggleCreateTask = () => {
    isCreatingTask = !isCreatingTask
    if (isCreatingTask) {
        createTaskContainer.classList.add("intro")
        createTaskContainer.classList.remove("extro")
    } else {
        createTaskContainer.classList.add("extro")
        createTaskContainer.classList.remove("intro")
    }
}

const createNewTask = (title, description) => {

    if (title === "" || description === "") return

    const now = new Date()
    const nowTime = now.toTimeString().split(" ")
    const newTask = {
        status: "todo",
        taskTitle: title,
        taskDescription: description,
        createdOn: `${now.toDateString() + ' ' + nowTime[0]}`,
        id: Math.floor(Math.random() * 100_000)
    }

    toggleCreateTask()

    createTaskInputField.value = ""
    createTaskTextAreaField.value = ""

    tasks.push(newTask)
    paintTasks(tasks)
}

// Remove a task
const allRemoveButtons = document.querySelectorAll(".remove")
allRemoveButtons.forEach(removeButton => {
    removeButton.addEventListener("click", () => removeTaskFunc(removeButton))
})

const removeTaskFunc = (removeButton) => {
    tasks = removeTask(parseInt(removeButton.getAttribute("id")))
    paintTasks(tasks)
}

const removeTask = (id) => tasks.filter(task => task.id !== id)


//  Ship to next
const allShipToNextButtons = document.querySelectorAll(".ship-to-next")
allShipToNextButtons.forEach(shipToNextButton => {
    shipToNextButton.addEventListener("click", () => shipToNextFunc(shipToNextButton))
})

const shipToNextFunc = (shipToNextButton) => {
    let nextArea = nextStatus(shipToNextButton.getAttribute("current-status"))
    let id = parseInt(shipToNextButton.getAttribute("id"))
    tasks = updateTaskStatus(id, nextArea)
    paintTasks(tasks)
}

const nextStatus = (currentStatus) => {
    if (currentStatus === "todo") return "in-progress"
    if (currentStatus === "in-progress") return "on-hold"
    if (currentStatus === "on-hold") return "done"
    return currentStatus
}

function loadTasks () {
    let previouslySavedTasks = window.localStorage.getItem("tasks")
    if (previouslySavedTasks === null) return []
    return JSON.parse(previouslySavedTasks)
}

function saveTasks (tasks) { window.localStorage["tasks"] = JSON.stringify(tasks) }

const getNowDate = () => `${new Date().toDateString() + ' ' + new Date().toLocaleTimeString()}`

function dateParser (date = '') {
    if (date === '' || date === undefined || date === null) return new Date().toDateString()
    return new Date(date)
}

let isNight = JSON.parse(window.localStorage.getItem("dark-theme")) || false
toggleTheme()
const toggler = document.querySelector("#dark-light-toggle")
toggler.addEventListener("change", (e) => toggleLightDarkMode())

function toggleLightDarkMode () {
    isNight = !isNight
    toggleTheme()
    window.localStorage["dark-theme"] = JSON.stringify(isNight)
}

function toggleTheme() {
    if (isNight) {
        createTaskContainer.classList.add("t-body")
        darkTheme.forEach(root => {
            let rootProperty = document.documentElement
            rootProperty.style.setProperty(root.property, root.value)
        })
    } else {
        createTaskContainer.classList.remove("t-body")
        lightTheme.forEach(root => {
            let rootProperty = document.documentElement
            rootProperty.style.setProperty(root.property, root.value)
        })
    }
}
