const form = document.querySelector(".form")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    let username = form.elements["username"].value
    let password = form.elements["password"].value

    const authenticateUser = async () => {
        const jwt = await getJwtToken(username, password)
        sessionStorage.setItem("jwt", jwt)
    }

    authenticateUser()

    const jwt = sessionStorage.getItem("jwt")

    if (jwt) {
        const origin = location.origin
        location.replace(origin + "/School-profile-stats")
        return
    }
}, false)

const getJwtToken = async (username, password) => {
    let url = "https://01.kood.tech/api/auth/signin"
    let headers = new Headers();

    headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

    try {
        const res = await fetch(url, {method: "POST", headers })
        const token = await res.json()
        return token
    } catch (e) {
        console.log(e.value)
        return null
    }
}