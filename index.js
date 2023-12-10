const baseofURL = 'https://blog.kreosoft.space/api/account/'


function navbarGenerate(){
    console.log(localStorage.getItem("jwtToken"))
    if (localStorage.getItem("jwtToken") != null){
        const div = document.createElement("div")
        div.className = "dropdown"

        const btn = document.createElement("button")
        btn.className = "btn btn-secondary dropdown-toggle"
        btn.type = "button"
        btn.id = "dropdownMenuButton"
        btn.setAttribute("data-bs-toggle","dropdown")
        btn.ariaExpanded = "false"
        btn.innerHTML = "user@example.com"

        const dropdownMenu = document.createElement("ul")
        dropdownMenu.className = "dropdown-menu dropdown-menu-end"
        dropdownMenu.setAttribute("aria-labelledby", "dropdownMenuButton")

        const liFirst = document.createElement("li")
        const liSecond = document.createElement("li")

        liFirst.innerHTML = "<a class=\"dropdown-item\">Профиль</a>"
        liSecond.innerHTML = "<a class=\"dropdown-item\">Выйти</a>"

        dropdownMenu.appendChild(liFirst)
        dropdownMenu.appendChild(liSecond)

        div.appendChild(btn)
        div.appendChild(dropdownMenu)

        document.getElementById("info").appendChild(div)
    }
    else {
        let btn = document.createElement("button")
        btn.className = "btn btn-outline-primary enter"
        btn.id = "Autorization"
        btn.innerText = "Вход"

        document.getElementById("info").appendChild(btn)
    }
}

function createRegisterBody(){
    return {
        fullName: document.getElementById("fullName").value,
        password: document.getElementById("passwordInput").value,
        email: document.getElementById("emailInput").value,
        birthDate: document.getElementById("birthDate").value,
        gender: document.getElementById("gender").value,
        phoneNumber: document.getElementById("phone").value
    };
}

function makeRequest(method, currentURL, body = null){

    const xhr = new XMLHttpRequest()

    xhr.open(method, baseofURL+currentURL)

    if (body!=null){
        xhr.responseType = 'json'
        xhr.setRequestHeader('accept', 'application/json')
        xhr.setRequestHeader('Content-Type', 'application/json')
    }
    else {
        xhr.setRequestHeader('accept', 'text/plain')
    }

    xhr.onload = () => {
        if (xhr.status == 200){
            var jwtToken = xhr.response.token
            localStorage.setItem('jwtToken',jwtToken)

            window.location.href = "http://frontsite/"
        }
        else {
            console.log(xhr.response)
        }
    }

    xhr.send(JSON.stringify(body))

}


