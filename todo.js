document.addEventListener("DOMContentLoaded", ()=>{
    const todoinput = document.getElementById("todo-input");
    const addTasktBtn = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let task = JSON.parse(localStorage.getItem("tasks")) || [];

    task.forEach(tasks  => renderTask(tasks))

    addTasktBtn.addEventListener("click", () => {
      const taskText = todoinput.value.trim();
      if (taskText == "") return;

      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      task.push(newTask);
      saveTask();
      renderTask(newTask);
      todoinput.value = "";
      console.log(task);
    });

    function renderTask(taskk) {
      let li = document.createElement('li');
      li.setAttribute("data-id",taskk.id);
      if(taskk.completed) li.classList.add("completed");
      li.innerHTML = `
      <span>${taskk.text}</span>
      <button>Delete</button>
      `
      li.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON') return;
        taskk.completed = !task.completed
        li.classList.toggle('completed')
        saveTask()

      });

      li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation() // prevents bubble effect
        task = task.filter(t =>   t.id !== taskk.id);
        li.remove();
        saveTask();
      })


      todoList.appendChild(li);
    }

    function saveTask() {
      localStorage.setItem("tasks", JSON.stringify(task));
    }


})