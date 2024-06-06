import { XKeep, ref } from "./xkeep.js";

new XKeep({
    actions: {
        COUNT_DOWN: {
            beforeprocess: () => {
                console.log("onEnter")
            },
            process: ($el) => {
                // const count = setInterval(() => {
                //     let counter = parseInt($el.innerText) === 0 ? 0 : parseInt($el.innerText) || 10
                //     $el.innerText = counter - 1
                //     if (counter <= 0) {
                //         console.log("WAF")
                //         $el.innerText = "Click me and see a count down from 10 to 0"
                //         clearInterval(count)
                //     }
                    
                // }, 1000)
                $el.innerText = "Loading..."
                setTimeout(() => {
                    $el.innerText = "Click me and see a count down from 10 to 0"
                    const pEl = ref("pp")
                    pEl.innerText = "Just finished counting"
                }, 5000)
            },
            afterprocess: () => {
                console.log("onExit")
            }
        }
    }
})