function createTask(title, due, description, onCompletion) {
  currentUid = sessionStorage.getItem("currentUid");
  const tasksRef = firebase.database().ref("users/" + currentUid + "/tasks");
  tasksRef.push({
    title: title,
    due: due,
    description: description
  }).then(() => {
    onCompletion();
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

function getTasks(onCompletion) {
  firebase.database().ref("users/" + currentUid + "/tasks").once("value")
  .then((snap) => {
    taskArray = []
    snap.forEach((childSnap) => {
      taskData = childSnap.val();
      taskData.due = Date.parse(taskData.due)
      taskData.uid = childSnap.key;
      taskArray.push(taskData);
    })

    onCompletion(taskArray);
  })
}
