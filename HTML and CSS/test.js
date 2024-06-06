let limit = 10
function getValue () {
    console.log('in func')
    return new Promise((resolve, reject) => {
        for (let i = 0; i < 20; i++) {
            if (i === limit) {
                getValue()
            } else {
                console.log(i)
            }
        }
    })
}
getValue()