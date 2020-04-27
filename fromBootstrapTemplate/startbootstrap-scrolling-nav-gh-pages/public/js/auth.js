currentUid = null;

function getUidFromEmail(email) {
  return email.replace(/\@/g, "").replace(/\./g, "");
}

function signUp(email, password, onCompletion, onError) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    var currentUid = getUidFromEmail(email);
    onCompletion();
  })
  .catch(function(error) {
    onError(error);
  })
}

function signIn(email, password, onCompletion, onError) {
  console.log(email, password)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log("login success")
    var currentUid = getUidFromEmail(email);
    onCompletion();
  })
  .catch(function(error) {
    console.log(error)
    onError(error);
  })
}

function forgotPassword(email, onCompletion = () => {}, onError = () => {}) {
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    onCompletion();
  })
  .catch(() => {
    onError();
  })
}
