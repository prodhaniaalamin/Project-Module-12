document.addEventListener("DOMContentLoaded", function () {//Ensures the script runs only after the full HTML is loaded
    // Selecting necessary elements
    const taskInput = document.getElementById("new-task"); // Input field for new task
    const addTaskButton = document.getElementById("addTask"); // Button to add/update task
    const incompleteTasksList = document.getElementById("items"); // List of incomplete tasks
    const completedTasksList = document.querySelector(".complete-list ul"); // List of completed tasks
    let taskBeingEdited = null; // Variable to track the task being edited

    // Event listener for adding or updating a task
    addTaskButton.addEventListener("click", function (event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        if (taskBeingEdited) {
            taskBeingEdited.querySelector("label").textContent = taskText;
            taskBeingEdited = null;
            addTaskButton.value = "Add Task";
        } else {
            addTask(taskText);
        }
        taskInput.value = "";
    });

    // Function to add or update a task
    function addTask(taskText) {
        const taskItem = document.createElement("li"); // Create a new task element
        taskItem.classList.add("item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskLabel = document.createElement("label");
        taskLabel.textContent = taskText;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(editButton);
        incompleteTasksList.appendChild(taskItem);

        // Function to mark a task as complete
        checkbox.addEventListener("change", function () {
            completeTask(taskItem);
        });

        // Function to edit an existing task
        editButton.addEventListener("click", function () {
            editTask(taskItem);
        });
    }

    function editTask(taskItem) {
        taskInput.value = taskItem.querySelector("label").textContent;
        taskBeingEdited = taskItem;
        addTaskButton.value = "Update Task";
    }

    function completeTask(taskItem) {
        taskItem.querySelector("input[type='checkbox']").remove();
        taskItem.querySelector(".edit").remove();
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        taskItem.appendChild(deleteButton);

        completedTasksList.appendChild(taskItem);

        // Function to delete a completed task
        deleteButton.addEventListener("click", function () {
            taskItem.remove();
        });
    }
});
