const input = document.querySelector(".input-modal");
const btn = document.querySelector(".btn");
const todo = document.querySelector(".todo");
const errorMessage = document.getElementById("error-message");
let todoList = [];

const viewTasks = () => {
  let viewTask = "";
  if (todoList.length === 0) {
    todo.innerHTML = "";
  }

  todoList.forEach((item, i) => {
    viewTask += `
          <li>
          <div class="label">
          <input type="checkbox" class="checkbox" id='item_${i}' ${
      item.done ? "checked" : ""
    }>
          <label for='item_${i}'>${item.todo}</label> 
          </div>
          <span class='delete-btn' data-index='${i}'>&#10006;</span>
          </li>
          `;
  });

  todo.innerHTML = viewTask;

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      todoList.splice(index, 1);
      viewTasks();
      localStorage.setItem("todo", JSON.stringify(todoList));
    });
  });
};

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo"));
  viewTasks();
}

input.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    const trimmedValue = input.value.trim();
    if (trimmedValue === "") {
      errorMessage.style.display = "block";
      input.classList.add("input-error");
      return;
    }

    errorMessage.style.display = "none";
    input.classList.remove("input-error");

    let newTodo = {
      todo: trimmedValue,
      done: false,
    };

    todoList.push(newTodo);
    viewTasks();
    localStorage.setItem("todo", JSON.stringify(todoList));
    input.value = "";
  }
});

btn.addEventListener("click", function () {
  todoList = todoList.filter((item) => !item.done);

  viewTasks();
  localStorage.setItem("todo", JSON.stringify(todoList));
});

todo.addEventListener("change", (event) => {
  let idInput = event.target.getAttribute("id");
  let valueLabel = todo.querySelector("[for=" + idInput + "]").innerHTML;

  todoList.forEach((item) => {
    if (item.todo === valueLabel) {
      item.done = !item.done;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});
