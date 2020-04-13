function createTask(title, due, description, onCompletion) {
  const tasksRef = firebase.database().ref("users/" + currentUid + "/tasks");
  tasksRef.push({
    title: title,
    due: due,
    description: description
  }).then(() => {
    onCompletion(tasksRef);
  });
}

function removeTask(taskId, onCompletion, onError) {
  firebase.database().ref("users/" + currentUid + "/tasks/" + taskId).remove()
  .then(() => {
    onCompletion();
  })
  .catch((error) => {
    onError(error);
  })
}
