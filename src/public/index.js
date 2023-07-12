document.getElementById('login').onclick = async e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const body = {email, password}
    const result = await fetch('/jwt/login', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const response = await result.json() //haciendo uso de fetch hay que pasar los datos a JSON
    console.log(response)
}