
// var user = firebase.auth().currentUser;
//
// if ( user) {
//     // User is signed in.
//     console.log(true);
// } else {
//     // No user is signed in.
//     console.log(false);
//     location.replace("login.html");
// }


    if (sessionStorage.getItem("userSignIn") === "n") {
        console.log("no user");
        location.replace('login.html');
    }
