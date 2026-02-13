//To be finished for MCO#2

//localStorage.removeItem("isLoggedIn");
// ^^ uncomment this when testing out guest mode first

let isLoggedIn = false;

let loggedIn = document.getElementById("loggedInContainer");
let loggedOut = document.getElementById("loggedOutContainer");

let loggedInProfile = document.getElementById("loggedInProfile");
let loggedOutProfile = document.getElementById("loggedOutProfile");

if (localStorage.getItem("isLoggedIn") === "true") {
    isLoggedIn = true;
}

if (loggedIn && loggedOut) {
    if (isLoggedIn) {
        loggedOut.style.display = "none";
        loggedIn.style.display = "block";
    } else {
        loggedIn.style.display = "none";
        loggedOut.style.display = "block";
    }
}

if (loggedInProfile && loggedOutProfile) {
    if (isLoggedIn) {
        loggedOutProfile.style.display = "none";
        loggedInProfile.style.display = "block";
    } else {
        loggedInProfile.style.display = "none";
        loggedOutProfile.style.display = "block";
    }
}

let registerButton = document.getElementById("registerButton");
if (registerButton) {
    registerButton.addEventListener("click", function() {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    });
}

let loginButton = document.getElementById("loginButton");
if (loginButton) {
    loginButton.addEventListener("click", function() {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    });
}

let logoutButton = document.getElementById("logoutButton");
if (logoutButton) {
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "index.html";
    });
}
