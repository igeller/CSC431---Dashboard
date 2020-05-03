currentUid = null;
var mystorage = sessionStorage;

function getUidFromEmail(email) {
  return email.replace(/\@/g, "").replace(/\./g, "");
}

function signUp(email, password, onCompletion) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    var currentUid = getUidFromEmail(email);
    onCompletion();
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if(errorCode == 'auth/email-already-in-use'){
      alert('That email is already in use. Please register a new email or click forgot password');
    }else if(errorCode == 'auth/invalid-email'){
      alert('The email is invalid.');
    } else if (errorCode == 'auth/weak-password') {
      alert('The password is too weak. Please make it at least 6 characters');
    }else {
      alert(errorMessage);
    }
    console.log(error);
  })
}

function signIn(email, password, onCompletion) {
  console.log(email, password)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log("login success")
    var currentUid = getUidFromEmail(email);
    sessionStorage.setItem("currentUid",currentUid);
    sessionStorage.setItem("userSignIn", "y");
    onCompletion();
  })
  .catch(function(error) {
    sessionStorage.setItem("userSignIn", "n");

    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Incorrect password.');
    } else if(errorCode === 'auth/invalid-email'){
      alert('Email not valid.')
    }else if(errorCode === 'auth/user-not-found'){
      alert("No account found with that email, please create an account.");
    } else {
      alert(errorMessage);
    }
    console.log(error)
    // onError(error);
  });
}

function resetPassword(email) {
  var actionCodeSettings = {
    url: 'https://bootstrap-firebase-b20fb.web.app/passwordReset'
  };
  firebase.auth().sendPasswordResetEmail(
      email, actionCodeSettings)
      .then(function() {
        // location.reload();
        $("#modal-b1").modal('toggle');
               $('body').prepend(`<div class="alert d-flex align-items-center pl-2 align-content-center alert-success alert-dismissible fade show" role="alert">
    <span class="font-size-lg d-block d-40 mr-2 text-center">
        <i class="far fa-life-ring"></i>
    </span>
    <span>
        <strong class="d-block">Success!</strong> This is a success alert—check it out!
    </span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>`)
      })
      .catch(function(error) {
        // Error occurred. Inspect error.code.
        if(error === 'auth/user-not-found'){
          alert("No account found for: " + email + "Please create an account.");
        } else if(error === 'auth/invalid-email'){
          alert(email + "is invalid");
        }else{
          alert(error.message)
        }
      });
}

function updateUserEmail(newEmail, onCompletion, onError) {
    var user = firebase.auth().currentUser;
    user.updateEmail(newEmail).then(function() {
        //Email updated successfully
        $("#modal-b1").modal('toggle');
               $('body').prepend(`<div class="alert d-flex align-items-center pl-2 align-content-center alert-success alert-dismissible fade show" role="alert">
    <span class="font-size-lg d-block d-40 mr-2 text-center">
        <i class="far fa-life-ring"></i>
    </span>
    <span>
        <strong class="d-block">Email changed successfully!</strong> This is a success alert—check it out!
    </span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>`)
    })
    .catch(function(error) {
        onError(error);
    })
}

function updateUserPassword(newPassword, onCompletion, onError) {
    var user = firebase.auth().currentUser;
    user.updatePassword(newPassword).then(function() {
        //Password updated successfully
        $("#modal-b1").modal('toggle');
               $('body').prepend(`<div class="alert d-flex align-items-center pl-2 align-content-center alert-success alert-dismissible fade show" role="alert">
    <span class="font-size-lg d-block d-40 mr-2 text-center">
        <i class="far fa-life-ring"></i>
    </span>
    <span>
        <strong class="d-block">Password changed successfully!</strong> This is a success alert—check it out!
    </span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</div>`)
    })
    .catch(function(error) {
        onError(error);
    })
}

// $.signedIn = function (){
  function signedIn(){
  firebase.auth().currentUser(function(user) {
    if (user) {
      console.log(user);
      return true;
    } else {
      console.log("no user");
      // location.replace('login.html');
      return false;
    }
  });
}

function logout() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
}
