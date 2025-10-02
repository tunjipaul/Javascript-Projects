function login() {
      let username = document.getElementById("username").value.trim();
      let password = document.getElementById("password").value.trim();
      let output = document.getElementById("error-message");

      if (username === "" || password === "") {
        output.textContent = "Error! Username or Password cannot be empty.";
        return;
      }

      if (username === "admin" && password === "library123") {
        // store login session
        localStorage.setItem("isLibrarianLoggedIn", "true");
        // redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        output.textContent = "Invalid username or password.";
      }
    }