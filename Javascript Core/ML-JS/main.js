import { Car } from "./car.js"
const canvas = document.getElementById("myCanvas")

// Get drawing context
const ctx = canvas.getContext("2d")

// Create instance of a car
const car = new Car(100, 100, 30, 50)
car.draw(ctx)

// Animate Car Movement

animate()

function animate() {
    car.update()
    canvas.height = window.innerHeight
    car.draw(ctx)
    requestAnimationFrame(animate)
}
