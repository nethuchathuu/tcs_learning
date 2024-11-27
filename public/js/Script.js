

form.addEventListener("submit", () => {
    const register = {
        email:email.value,
        password:password.value,
        username:username.value
    }

    fetch("/api/register", {
        method: "POST",
        body:JSON.stringify(register),
        headers: {
            "Content-type":"application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error

            } else{
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success
            }
        })
 })


