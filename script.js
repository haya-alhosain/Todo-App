let tasks = [];
function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedTasks ?? [];
}
getTasksFromStorage();
// Read
function fullTasks() {
  document.getElementById("my-tasks").innerHTML = "";
  let idx = 0;
  tasks.map((task) => {
    document.getElementById("my-tasks").innerHTML += `
    <div class="task ${task.isDone ? "done" : ""}">
    <div class="task_info" style="width: 75%">
      <h4>${task.title}</h4>
      <div>
        <span>${task.date}</span>
      </div>
    </div>
    <div class="task_actions" style="width: 25%">
      <button class="d btn_circle" onclick="taskDeleted(${idx})"><i class="fa-solid fa-trash-can"></i></button>
      ${
        task.isDone
          ? `
            <button class="c btn_circle" style="background-color:#555" onclick="completeTask(${idx})">
            <i class="fa-solid fa-x"></i>
            </button>
          `
          : `
              <button class="c btn_circle"  onclick="completeTask(${idx})"><i class="fa-solid fa-check"></i></button>
             `
      }
      
      <button class="u btn_circle" onclick="taskUpdated(${idx})"><i class="fa-solid fa-pen"></i></button>
    </div>
  </div>
    `;
    idx++;
    // console.log(idx);
  });
}

fullTasks();
// create
document.getElementById("add-btn").addEventListener("click", () => {
  let dateNow = new Date();
  let month = dateNow.getMonth();
  let year = dateNow.getFullYear();
  let today = dateNow.getDate();
  let date = `${today}/${
    month + 1
  }/${year} - ${dateNow.getHours()}:${dateNow.getMinutes()} `;

  let taskName = prompt("Add Your Task For Today");
  let taskObject = {
    title: taskName,
    date: date,
    isDone: false,
  };
  if (taskObject.title != "") {
    tasks.push(taskObject);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fullTasks();
});

// delete
function taskDeleted(idx) {
  let task = tasks[idx];
  // لحذف عنصر من المصفوفة عن طريق ال الاندكس
  let isConfirm = confirm(`Are you sure for deleted : ${task.title} ?`);
  if (isConfirm) {
    tasks.splice(idx, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    fullTasks();
  }
}
// Update
function taskUpdated(idx) {
  let task = tasks[idx];
  let isConfirm = prompt(
    `Are you sure for Update : ${task.title} ?`,
    task.title
  );
  task.title = isConfirm;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fullTasks();
}
// is done task
function completeTask(idx) {
  let task = tasks[idx];
  task.isDone = !task.isDone;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  fullTasks();
}
