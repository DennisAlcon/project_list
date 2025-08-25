//Here I declared new variables to handle modals and form elements
const taskForm = document.getElementById("taskForm");
const tasksList = document.getElementById("tasksList");

const viewModal = new bootstrap.Modal(document.getElementById("viewTaskModal"));
const viewTitle = document.getElementById("viewTaskTitle");
const viewDescription = document.getElementById("viewTaskDescription");

const editModal = new bootstrap.Modal(document.getElementById("editTaskModal"));
const editTitle = document.getElementById("editTaskTitle");
const editDescription = document.getElementById("editTaskDescription");
const finishedModal = new bootstrap.Modal(document.getElementById("finishedTaskModal"));
const againModal = new bootstrap.Modal(document.getElementById("againTaskModal"));
//This variable will help to know which tasks are being finished
let editIndex = null;
// This function adds a new tass
taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("titles").value;
    const description = document.getElementById("descriptions").value;
    if(title === "" || description === "") {
        againModal.show();
    return;
    }
    const tasks = getTasks();
    tasks.push({title, description,marked: false});
    saveTasks(tasks);
    taskForm.reset();
    renderTasks();
});
//This function gets tasks from LocalStorage, if there are no tasks, it returns an empty array
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// This function saves tasks to LocalStorage,but first, it has to have a parameter like an object task.
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// This function renders tasks in the task list
function renderTasks() {
    const tasks = getTasks();
    tasksList.innerHTML = "";
    tasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = "list-group-item d-flex justify-content-between align-items-center";
    const completedStyle = task.marked ? 'style="text-decoration:line-through ;"' : "";
    taskItem.innerHTML = `
        <div>
        <span>
        <input type="checkbox"${task.marked ? "checked" : ""} onclick="toggleComplete(${index})">
        <span ${completedStyle}><strong>${task.title}</strong>
        </div>
        <div>
        <button class="btn btn-primary btn-sm me-2" onclick="viewTask(${index})">Ver</button>
        <button class="btn btn-warning btn-sm me-2" onclick="editTask(${index})">Editar</button>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Eliminar</button>
        </div>`
    ;
    tasksList.appendChild(taskItem);
    });
}
// With this function, We can view any task in a modal
function viewTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    if(tasks[index].marked!==true){
    viewTitle.textContent = task.title;
    viewDescription.textContent = task.description;
    viewModal.show();
    }
    else{
        finishedModal.show();
    }
    
}
//This function helps to edit a task
function editTask(index) {
    const tasks = getTasks();
    const task = tasks[index];
    editTitle.value = task.title;
    editDescription.value = task.description;
    editIndex = index;
    editModal.show();
}
// This function saves the edited task
function saveEdit() {
    const tasks = getTasks();
    tasks[editIndex].title = editTitle.value;
    tasks[editIndex].description = editDescription.value;
    saveTasks(tasks);
    editModal.hide();
    renderTasks();
}
// this function helps us when we want to mark a task as completed or not
function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].marked = !tasks[index].marked;
    saveTasks(tasks);
    renderTasks();
}
// Delete a task
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}
// Initial render of tasks
renderTasks();
