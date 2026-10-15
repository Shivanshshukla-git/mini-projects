// const taskInp= document.querySelector("#taskInput");
// const addBtn= document.querySelector("#addBtn");
// const clearBtn= document.querySelector("#clearBtn");
// const taskList= document.querySelector("#taskList");

// addBtn.addEventListener("click", function(detail){
//     detail.preventDefault();

//     const taskText = taskInp.value.trim();

//     if (taskText === "") {
//         alert("Please type a task first!");
//         return; 
//     }

//     const newList= document.createElement("li");
    
//     const checkbox = document.createElement("input");
//     checkbox.type = "checkbox";
    
//     const taskSpan = document.createElement("span");
//     taskSpan.textContent = taskText;

//     newList.append(checkbox);
//     newList.append(taskSpan);
    
//     taskList.append(newList);

//     taskInp.value= "";

//     checkbox.addEventListener("change", function() {
//         if (checkbox.checked) {
//             taskSpan.style.textDecoration = "line-through";
//             taskSpan.style.color = "#888888";                        // Optional: dim the text
//         } else {
//             taskSpan.style.textDecoration = "none";
//             taskSpan.style.color = "";                                 // Resets back to original layout color
//         }
//     });

//     saveTasks();
// });

// taskInp.addEventListener("keydown", function(event){
//     if(event.key === "Enter"){
//         addBtn.click();
//     }
// });

// clearBtn.addEventListener("click", function(){
//     const allCheckBoxes= document.querySelectorAll("input[type= 'checkbox']");
//     let hasUnfinishedTasks= false;

//     allCheckBoxes.forEach(function(box) {
//         if (box.checked === false) {
//             hasUnfinishedTasks = true;                  // Found an unfinished task!
//         }
//     });

//     if(hasUnfinishedTasks){
//         // confirm() pops up a box with "OK" (returns true) and "Cancel" (returns false)
//         const userChoice = confirm("⚠️ Warning: You still have some unfinished tasks; Do you still want to clear? ");
        
//         if (userChoice === false) {
//             return;                                  // Stops the function early, preserving their list items safely!
//         }
//     }

//     // This line only runs if everything is finished, OR if the user clicked "OK" on the warning
//     taskList.innerHTML = ""; 

//     saveTasks();
// });

// function saveTasks(){
//     const tasks=[];

//     document.querySelectorAll("#taskList li").forEach(function(li) {
//         const text = li.querySelector("span").textContent;
//         const completed = li.querySelector("input").checked;

//         tasks.push({
//             text: text,
//             completed: completed
//         });
//     })

//     localStorage.setItem("todos", JSON.stringify(tasks));
// }    

// function loadTasks(){
//     const saved = localStorage.getItem("todos");
//     if (!saved) return;

//     const tasks = JSON.parse(saved);

//     tasks.forEach(function(task) {
//         const newList = document.createElement("li");

//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.checked = task.completed;

//         const taskSpan = document.createElement("span");
//         taskSpan.textContent = task.text;

//         if (task.completed) {
//             taskSpan.style.textDecoration = "line-through";
//             taskSpan.style.color = "#888888";
//         }

//         newList.append(checkbox);
//         newList.append(taskSpan);
//         taskList.append(newList);

//         // Re-add the change event for checkbox - 
//         checkbox.addEventListener("change", function() {
//             if (checkbox.checked) {
//                 taskSpan.style.textDecoration = "line-through";
//                 taskSpan.style.color = "#888888";
//             }   
//             else {
//                 taskSpan.style.textDecoration = "none";
//                 taskSpan.style.color = "";
//             }

//             saveTasks();                            // save when checked/unchecked
//         });
//     });
// }

// loadTasks();





// Clean and optimized version with the help of AI - 

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const taskList = document.querySelector("#taskList");

// ===== Save to localStorage =====
function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll("li").forEach(li => {
    tasks.push({
        text: li.querySelector("span").textContent,
        completed: li.querySelector("input").checked
    });
    });

    localStorage.setItem("todos", JSON.stringify(tasks));
}

// ===== Create one task element =====
function createTaskElement(text, completed = false) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.textContent = text;

    if (completed) {
    span.style.textDecoration = "line-through";
    span.style.color = "#888";
    }

    // Toggle completed
    checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
        span.style.textDecoration = "line-through";
        span.style.color = "#888";
    } else {
        span.style.textDecoration = "none";
        span.style.color = "";
    }
    saveTasks();
    });

    li.append(checkbox, span);
    return li;
}

// ===== Add Task =====
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please type a task first!");
        return;
    }

    const taskElement = createTaskElement(text);
    taskList.append(taskElement);
    taskInput.value = "";
    saveTasks();
}

// ===== Load Tasks =====
function loadTasks() {
    const saved = localStorage.getItem("todos");
    if (!saved) return;

    const tasks = JSON.parse(saved);
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.completed);
        taskList.append(taskElement);
    });
}

// ===== Clear All =====
clearBtn.addEventListener("click", () => {
    const hasUnfinished = [...taskList.querySelectorAll("input")].some(box => !box.checked);

    if (hasUnfinished) {
        const confirmClear = confirm("You still have unfinished tasks. Clear all?");
        if (!confirmClear) return;
    }

    taskList.innerHTML = "";
    saveTasks();
});

// ===== Event Listeners =====
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});

// Load on page start
loadTasks();