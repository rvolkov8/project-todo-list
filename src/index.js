import pageCreator from './PageCreator';
import domController from './DomController';
import taskLibrary from './TaskLibrary';
import taskForm from './TaskForm';

const domControllerObj = domController();
const pageCreatorObj = pageCreator();

// Creates inbox page content
pageCreatorObj.createInboxPage(domControllerObj);
// Creates task form object
const taskFormObj = taskForm();
// Creates task library object
const taskLibraryObj = taskLibrary();

const mainContentEl = document.querySelector('.main-content');
const inboxTasksEl = document.querySelector('.inbox-tasks');
const addTaskEl = document.querySelector('.add-task-el');

// Appends add task form to the inbox page content
mainContentEl.append(taskFormObj.createTaskForm());

//

const addTaskForm = document.querySelector('.add-task-form');
const cancelButton = document.querySelector('.cancel-button');
const addTaskButton = document.querySelector('.add-task-button');

// Listens to show/hide add task form and show/hide add new task element
addTaskEl.addEventListener('click', () => {
  domControllerObj.toggleAppearanceFlex(addTaskEl);
  domControllerObj.toggleAppearanceFlex(addTaskForm);
});

// Listens to show/hide add task form and show/hide add new task element
cancelButton.addEventListener('click', () => {
  domControllerObj.toggleAppearanceFlex(addTaskEl);
  domControllerObj.toggleAppearanceFlex(addTaskForm);
  taskFormObj.clearForm();
});

// Creates new todo object, pushes it into the library and clears the add task form
addTaskButton.addEventListener('click', () => {
  const taskInfoArr = taskFormObj.getTaskInfo();

  const newTodo = taskLibraryObj.createTask(taskInfoArr);
  taskLibraryObj.addTask(newTodo);
  taskFormObj.clearForm();
  inboxTasksEl.style.display = 'flex';
  domControllerObj.showTasks(taskLibraryObj.getInboxTasks(), inboxTasksEl);
});
