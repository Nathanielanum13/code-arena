const smo = async () => {
    let response = await fetch("https://f29f-154-120-216-242.ngrok-free.app/register-accounts", {
        body: JSON.stringify({
            "account_number": "91300045678",
            "account_name": "Prince Bobby",
            "webhook": "https://webhook.site/4b9bc5e2-15ff-4580-8616-a8de932156bc"
        }),
        method: "POST"
    })

    const data = await response.json()

    console.log(data)
}

let counter = 1000
for await (const data of Array.from({ length: 1000 }, (_, index) => index + 1)) {
    console.log(data)
    // smo()
}