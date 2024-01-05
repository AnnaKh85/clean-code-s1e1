// Define constants for element IDs
const taskInput = document.getElementById("new-task");
const addButton = document.querySelector("button");
const incompleteTaskHolder = document.getElementById("incomplete-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

/**
 * Creates a new task list item element
 * @param {string} taskString - The task text
 * @returns {HTMLLIElement} The new task list item element
 */
function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "btn edit";

  deleteButton.className = "btn delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

/**
 * Adds a new task to the task list
 * @param {string} taskString - The task text
 */
function addTask() {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  listItem.classList.add("list__item");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

/**
 * Edit an existing task
 * @param {HTMLLIElement} listItem - The task list item element
 */
function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
}

/**
 * Delete a task
 * @param {HTMLLIElement} listItem - The task list item element
 */
function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

/**
 * Mark task as completed
 * @param {HTMLLIElement} listItem - The task list item element
 */
function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

/**
 * Mark task as incomplete
 * @param {HTMLLIElement} listItem - The task list item element
 */
function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

// AJAX request function
function ajaxRequest() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

/**
 * Binds event handlers to a task list item.
 * @param {HTMLLIElement} taskListItem - The task list item element.
 * @param {function} checkBoxEventHandler - The event handler for the checkbox.
 */
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
}

// Bind events for existing incomplete tasks
for (const listItem of incompleteTaskHolder.children) {
  bindTaskEvents(listItem, taskCompleted);
}

// Bind events for existing completed tasks
for (const listItem of completedTasksHolder.children) {
  bindTaskEvents(listItem, taskIncomplete);
}
