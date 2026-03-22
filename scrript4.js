// Class
class Task {
  constructor(text) {
    this.text = text;
    this.completed = false;
    this.createdAt = new Date(); // timestamp
  }

  toggle() {
    this.completed = !this.completed;
  }
}

// DATA 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// DOM
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

//ADD TASK
addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const task = new Task(text);
  tasks.push(task);

  input.value = "";
  saveAndRender();
});

// SAVE
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//  FILTER 
function setFilter(type) {
  filter = type;

  // remove active class from all buttons
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.classList.remove("active");
  });

  // add active class to clicked button
  event.target.classList.add("active");

  renderTasks();
}

// SORT
function sortTasks(type) {
  if (type === "name") {
    tasks.sort((a, b) => a.text.localeCompare(b.text));
  } else {
    tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  saveAndRender();
}

// EDIT
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveAndRender();
  }
}

// DELETE
function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

// RENDER
function renderTasks() {
  list.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "incomplete") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "task-info";

    info.innerHTML = `
      <strong>${task.text}</strong><br>
      <small>${new Date(task.createdAt).toLocaleString()}</small>
    `;

    if (task.completed) li.classList.add("completed");

    info.addEventListener("click", () => {
      task.toggle();
      saveAndRender();
    });

    // ICON BUTTONS
    const icons = document.createElement("div");
    icons.className = "icons";

    icons.innerHTML = `
      <button onclick="editTask(${tasks.indexOf(task)})">✏️</button>
      <button onclick="deleteTask(${tasks.indexOf(task)})">🗑️</button>
    `;

    li.appendChild(info);
    li.appendChild(icons);
    list.appendChild(li);
  });
}

// SAVE + RENDER
function saveAndRender() {
  saveTasks();
  renderTasks();
}

// INIT
renderTasks();