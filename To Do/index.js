const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = () => {
    countValue.innerText = taskCount;
};
const updateCountToZero = () => {
  taskCount = 0;
  displayCount();
};


const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    const task = `
        <div class="task">
            <input type="checkbox" class="task-check"/>
            <span class="taskname">${taskName}</span>
            <button class="edit">
                <i class="fa-regular fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;

    tasksContainer.insertAdjacentHTML("beforeend", task);
    taskCount += 1;
    displayCount();

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.parentNode.remove();          
              if(taskCount > 0){
            taskCount -= 1;
            displayCount();
        }
        });
    });

    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((editBtn) => {
        editBtn.addEventListener("click", (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount();
        });
    });

    const tasksCheck = document.querySelectorAll(".task-check");
    tasksCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            const taskSpan = checkBox.nextElementSibling;
            taskSpan.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount();
        };
    });

    newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
    displayCount(); // Initialize the task count when the page loads
    newTaskInput.value = "";
};
tasksContainer.addEventListener("click", (e) => {
  const target = e.target;
  if (target.classList.contains("delete")) {
      deleteTask(target.closest(".task"));
  } else if (target.classList.contains("edit")) {
      editTask(target.closest(".task"));
  } else if (target.classList.contains("task-check")) {
      toggleTaskCompletion(target);
  }
});
