form.addEventListener("submit", () => {
    const login = {
        email:email.value,
        password:password.value
    }

    fetch("/api/login", {
        method: "POST",
        body:JSON.stringify(login),
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
 const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        // Show the password and display the "cut-eye" icon
        passwordInput.type = "text";
        togglePassword.classList.remove("bx-hide");
        togglePassword.classList.add("bx-show");
    } else {
        // Hide the password and display the "eye" icon
        passwordInput.type = "password";
        togglePassword.classList.remove("bx-show");
        togglePassword.classList.add("bx-hide");
    }
});



