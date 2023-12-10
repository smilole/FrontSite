const baseofURL = 'https://blog.kreosoft.space/api/account/'


function navbar(){
    if (localStorage.getItem("jwtToken") != null){
       window.location.href = "http://frontsite"
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
        email: document.getElementById("emailInput").value,
        password: document.getElementById("passwordInput").value
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
        if (xhr.response.status == 200){
            var jwtToken = xhr.response.token
            localStorage.setItem('jwtToken',jwtToken)

            window.location.href = "main.html"
        }
        else {
            console.log(xhr.response)
        }
    }

    xhr.send(JSON.stringify(body))

}


