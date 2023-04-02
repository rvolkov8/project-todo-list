import './css-files/page.css';

import domController from './DomController';
import taskForm from './TaskForm';

export default function pageController(taskLibraryObj) {
  const mainContentEl = document.querySelector('.main-content');

  const taskFormObj = taskForm();
  const domControllerObj = domController();

  function createPage(page) {
    const titleText = page;
    // Creates title element
    const title = document.createElement('div');
    title.classList.add('title');
    switch (page) {
      case 'inbox':
        title.textContent = 'Inbox';
        break;
      case 'today':
        title.textContent = 'Today';
        break;
      case 'this-week':
        title.textContent = 'This week';
        break;
      default:
        title.textContent = titleText;
        break;
    }
    mainContentEl.append(title);

    // Creates  projects div
    const tasksDiv = document.createElement('div');
    tasksDiv.classList.add('tasks');

    // Creates Add new task button element
    const addTaskEl = document.createElement('div');
    addTaskEl.classList.add('add-task-el');
    addTaskEl.style.display = 'flex';

    // Creates the elements of the button
    const plusSign = document.createElement('div');
    plusSign.classList.add('plus-sign');
    plusSign.textContent = '+';

    const addTaskText = document.createElement('div');
    addTaskText.classList.add('add-task-text');
    addTaskText.textContent = 'Add task';

    // Appends the elements to the Add new task button element
    addTaskEl.append(plusSign, addTaskText);

    // Appends projects div and the add new task element to the main section
    mainContentEl.append(tasksDiv, addTaskEl);

    // Creates task form
    const newTaskForm = taskFormObj.createTaskForm();
    mainContentEl.append(newTaskForm);

    const cancelButton = document.querySelector('.cancel-button');
    const addTaskButton = document.querySelector('.add-task-button');
    const tasksEl = document.querySelector('.tasks');

    // Listens to show/hide add task form and show/hide add new task element
    addTaskEl.addEventListener('click', () => {
      domControllerObj.toggleAppearanceFlex(addTaskEl);
      domControllerObj.toggleAppearanceFlex(newTaskForm);
    });

    // Listens to show/hide add task form and show/hide add new task element
    cancelButton.addEventListener('click', () => {
      domControllerObj.toggleAppearanceFlex(addTaskEl);
      domControllerObj.toggleAppearanceFlex(newTaskForm);
      taskFormObj.clearForm();
    });

    // Creates new todo object, pushes it into the library and clears the add task form
    addTaskButton.addEventListener('click', () => {
      const taskInfoArr = taskFormObj.getTaskInfo();
      const newTask = taskLibraryObj.createTask(taskInfoArr);
      taskLibraryObj.addTask(newTask);
      taskFormObj.clearForm();
      tasksEl.style.display = 'flex';
      domControllerObj.showTasks(taskLibraryObj.getTasks(page), tasksEl);
    });
  }

  function chooseCategory(page) {
    mainContentEl.innerHTML = '';
    createPage(page);

    const tasksEl = document.querySelector('.tasks');
    domControllerObj.showTasks(taskLibraryObj.getTasks(page), tasksEl);
  }

  const inboxCategory = document.querySelector('.category.inbox');
  const todayCategory = document.querySelector('.category.today');
  const thisWeekCategory = document.querySelector('.category.this-week');

  function chooseCategoryAndUpdateUI(categoryEl, categoryName) {
    if (!categoryEl.classList.contains('pressed')) {
      inboxCategory.classList.remove('pressed');
      todayCategory.classList.remove('pressed');
      thisWeekCategory.classList.remove('pressed');

      const projectsNodes = document.querySelectorAll('.project');
      for (let i = 0; i < projectsNodes.length; i += 1) {
        const node = projectsNodes[i];
        node.classList.remove('pressed');
      }
      categoryEl.classList.add('pressed');
      const page = categoryName;
      chooseCategory(page);
    }
  }

  function updateTaskForm(projectName) {
    taskFormObj.addProjectToTaskForm(projectName);
  }

  return {
    createPage,
    chooseCategory,
    chooseCategoryAndUpdateUI,
    updateTaskForm,
  };
}
