currentUid = null;

function getUidFromEmail(email) {
  return email.replace(/\@/g, "").replace(/\./g, "");
}

function signUp(email, password, onCompletion, onError) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(() => {
    currentUid = getUidFromEmail(email);
    onCompletion();
  })
  .catch(function(error) {
    onError(error);
  })
}

function signIn(email, password, onCompletion, onError) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    currentUid = getUidFromEmail(email);
    onCompletion();
  })
  .catch(function(error) {
    onError(error);
  })
}
