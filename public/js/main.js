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

let liked = false;
let disliked = false;

function changeLikeImage() {
  var likeImg = document.getElementById("like");
  var dislikeImg = document.getElementById("dislike");

  if (!liked) {
    likeImg.src = "../images/blue-like.png";
    liked = true;

    dislikeImg.src = "../images/thumbs-down.png";
    disliked = false;

  } else {
    likeImg.src = "../images/thumbs-up.png";
    liked = false;
  }
}

function changeDislikeImage() {
  var likeImg = document.getElementById("like");
  var dislikeImg = document.getElementById("dislike");

  if (!disliked) {
    dislikeImg.src = "../images/red-dislike.png";
    disliked = true;

    likeImg.src = "../images/thumbs-up.png";
    liked = false;

  } else {
    dislikeImg.src = "../images/thumbs-down.png";
    disliked = false;
  }
}

let liked2 = false;
let disliked2 = false;

function changeLikeImage2() {
  var likeImg2 = document.getElementById("like2");
  var dislikeImg2 = document.getElementById("dislike2");

  if (!liked2) {
    likeImg2.src = "../images/blue-like.png";
    liked2 = true;

    dislikeImg2.src = "../images/thumbs-down.png";
    disliked2 = false;

  } else {
    likeImg2.src = "../images/thumbs-up.png";
    liked2 = false;
  }
}

function changeDislikeImage2() {
  var likeImg2 = document.getElementById("like2");
  var dislikeImg2 = document.getElementById("dislike2");

  if (!disliked2) {
    dislikeImg2.src = "../images/red-dislike.png";
    disliked2 = true;

    likeImg2.src = "../images/thumbs-up.png";
    liked2 = false;

  } else {
    dislikeImg2.src = "../images/thumbs-down.png";
    disliked2 = false;
  }
}

let liked3 = false;
let disliked3 = false;

function changeLikeImage3() {
  var likeImg3 = document.getElementById("like3");
  var dislikeImg3 = document.getElementById("dislike3");

  if (!liked3) {
    likeImg3.src = "../images/blue-like.png";
    liked3 = true;

    dislikeImg3.src = "../images/thumbs-down.png";
    disliked3 = false;

  } else {
    likeImg3.src = "../images/thumbs-up.png";
    liked3 = false;
  }
}

function changeDislikeImage3() {
  var likeImg3 = document.getElementById("like3");
  var dislikeImg3 = document.getElementById("dislike3");

  if (!disliked3) {
    dislikeImg3.src = "../images/red-dislike.png";
    disliked3 = true;

    likeImg3.src = "../images/thumbs-up.png";
    liked3 = false;

  } else {
    dislikeImg3.src = "../images/thumbs-down.png";
    disliked3 = false;
  }
}

let liked4 = false;
let disliked4 = false

function changeLikeImage4() {
  var likeImg4 = document.getElementById("like4");
  var dislikeImg4 = document.getElementById("dislike4");

  if (!liked4) {
    likeImg4.src = "../images/blue-like.png";
    liked4 = true;

    dislikeImg4.src = "../images/thumbs-down.png";
    disliked4 = false;

  } else {
    likeImg4.src = "../images/thumbs-up.png";
    liked4 = false;
  }
}

function changeDislikeImage4() {
  var likeImg4 = document.getElementById("like4");
  var dislikeImg4 = document.getElementById("dislike4");

  if (!disliked4) {
    dislikeImg4.src = "../images/red-dislike.png";
    disliked4 = true;

    likeImg4.src = "../images/thumbs-up.png";
    liked4 = false;

  } else {
    dislikeImg4.src = "../images/thumbs-down.png";
    disliked4 = false;
  }
}

let liked5 = false;
let disliked5 = false

function changeLikeImage5() {
  var likeImg5 = document.getElementById("like5");
  var dislikeImg5 = document.getElementById("dislike5");

  if (!liked5) {
    likeImg5.src = "../images/blue-like.png";
    liked5 = true;

    dislikeImg5.src = "../images/thumbs-down.png";
    disliked5 = false;

  } else {
    likeImg5.src = "../images/thumbs-up.png";
    liked5 = false;
  }
}

function changeDislikeImage5() {
  var likeImg5 = document.getElementById("like5");
  var dislikeImg5 = document.getElementById("dislike5");

  if (!disliked5) {
    dislikeImg5.src = "../images/red-dislike.png";
    disliked5 = true;

    likeImg5.src = "../images/thumbs-up.png";
    liked5 = false;

  } else {
    dislikeImg5.src = "../images/thumbs-down.png";
    disliked5 = false;
  }
}


