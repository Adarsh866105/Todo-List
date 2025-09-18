document.addEventListener("DOMContentLoaded", () => {
  const todoinput = document.getElementById("todo-input");
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const taskInput = todoinput.value.trim();
    if (taskInput.value == "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    tasks.push(newTask);
    saveData();
    console.log(tasks);
    todoinput.value = "";
  });

  function renderTask(task) {
    let li = document.createElement('li');
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
        <span>${task.text}</span>
        <button>Delete</button>
        `;
    li.addEventListener("click", (e) => {
      if (event.target.tagName == "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveData();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveData();
    });
    todoList.appendChild(li);
  }

  function saveData() {
    localStorage.getItem("task", JSON.stringify(tasks));
  }
});
