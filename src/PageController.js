import './css-files/page.css';
import './css-files/task.css';
import './css-files/add-task-el.css';
import taskLibrary from './TaskLibrary';
import DateObj from './Date';
import taskForm from './TaskForm';

export default function pageController() {
  const mainContentEl = document.querySelector('.main-content');

  const taskLibraryObj = taskLibrary();
  const taskFormObj = taskForm();
  const date = DateObj();

  function toggleAppearanceFlex(element) {
    const el = element;
    el.style.display = el.style.display === 'none' ? 'flex' : 'none';
  }

  function formatTaskDate(dateStr) {
    const dateArr = dateStr.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    let formattedMonth;

    switch (month) {
      case '01':
        formattedMonth = 'Jan';
        break;
      case '02':
        formattedMonth = 'Feb';
        break;
      case '03':
        formattedMonth = 'March';
        break;
      case '04':
        formattedMonth = 'April';
        break;
      case '05':
        formattedMonth = 'May';
        break;
      case '06':
        formattedMonth = 'June';
        break;
      case '07':
        formattedMonth = 'July';
        break;
      case '08':
        formattedMonth = 'Aug';
        break;
      case '09':
        formattedMonth = 'Sept';
        break;
      case '10':
        formattedMonth = 'Oct';
        break;
      case '11':
        formattedMonth = 'Nov';
        break;
      case '12':
        formattedMonth = 'Dec';
        break;
      default:
        break;
    }

    if (dateStr === date.formatDate(date.currDate)) {
      return 'Today';
    }
    return `${day} ${formattedMonth} ${year}`;
  }

  function showTasks(tasksArr, tasksEl) {
    // eslint-disable-next-line no-param-reassign
    tasksEl.innerHTML = '';

    tasksArr.forEach((task) => {
      // eslint-disable-next-line no-use-before-define
      const taskElement = createTaskElement(task);
      tasksEl.appendChild(taskElement);
    });
  }

  function createTaskElement(task) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');

    const checkBoxContainer = document.createElement('div');
    checkBoxContainer.classList.add('checkbox-container');

    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    switch (task.priority) {
      case '1':
        checkBox.classList.add('priorityOne');
        break;
      case '2':
        checkBox.classList.add('priorityTwo');
        break;
      case '3':
        checkBox.classList.add('priorityThree');
        break;
      case '4':
        checkBox.classList.add('priorityFour');
        break;
      case '5':
        checkBox.classList.add('priorityFive');
        break;
      default:
        break;
    }
    checkBox.addEventListener('click', () => {
      setTimeout(() => {
        const tasksEl = document.querySelector('.tasks');
        taskLibraryObj.deleteTask(task);
        showTasks(taskLibraryObj.getTasks(task.project), tasksEl);
      }, 240);
    });

    checkBoxContainer.appendChild(checkBox);

    const taskInfoContainer = document.createElement('div');
    taskInfoContainer.classList.add('task-info-container');

    const taskName = document.createElement('div');
    taskName.classList.add('added-task-name');
    taskName.textContent = task.title;

    const taskDescription = document.createElement('div');
    taskDescription.classList.add('added-task-description');
    taskDescription.textContent = task.description;

    const taskDueDate = document.createElement('div');
    taskDueDate.classList.add('added-task-due-date');
    taskDueDate.textContent = formatTaskDate(task.dueDate);

    if (taskDueDate.textContent === 'Today') {
      taskDueDate.style.color = '#2563eb';
    }

    taskInfoContainer.append(taskName, taskDescription, taskDueDate);

    const taskOperationsContainer = document.createElement('div');
    taskOperationsContainer.classList.add('task-operations-container');

    const deleteTaskButton = document.createElement('button');
    deleteTaskButton.classList.add('delete-task-button');
    deleteTaskButton.textContent = 'X';
    deleteTaskButton.addEventListener('click', () => {
      const tasksEl = document.querySelector('.tasks');
      taskLibraryObj.deleteTask(task);
      showTasks(taskLibrary.getTasks(task.project), tasksEl);
    });

    taskOperationsContainer.append(deleteTaskButton);

    taskContainer.append(
      checkBoxContainer,
      taskInfoContainer,
      taskOperationsContainer
    );

    return taskContainer;
  }

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
      toggleAppearanceFlex(addTaskEl);
      toggleAppearanceFlex(newTaskForm);
    });

    // Listens to show/hide add task form and show/hide add new task element
    cancelButton.addEventListener('click', () => {
      toggleAppearanceFlex(addTaskEl);
      toggleAppearanceFlex(newTaskForm);
      taskFormObj.clearForm();
    });

    // Creates new todo object, pushes it into the library and clears the add task form
    addTaskButton.addEventListener('click', () => {
      const taskInfoArr = taskFormObj.getTaskInfo();
      const newTask = taskLibraryObj.createTask(taskInfoArr);
      taskLibraryObj.addTask(newTask);
      taskFormObj.clearForm();
      tasksEl.style.display = 'flex';
      showTasks(taskLibraryObj.getTasks(page), tasksEl);
    });
  }

  function chooseCategory(page) {
    mainContentEl.innerHTML = '';
    createPage(page);

    const tasksEl = document.querySelector('.tasks');
    showTasks(taskLibraryObj.getTasks(page), tasksEl);
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

  function createProjectOption(projectName) {
    const project = document.createElement('option');
    project.setAttribute('value', projectName);
    project.textContent = projectName;
    return project;
  }

  function updateProjectSelectEl(categoryName) {
    const projectNames = taskLibraryObj.getProjectNames();
    const projectSelectEl = document.querySelector('.task-project');
    projectSelectEl.innerHTML = '';
    projectSelectEl.append(createProjectOption('inbox'));
    projectNames.forEach((projectName) => {
      const project = createProjectOption(projectName);
      if (projectName === categoryName) {
        project.setAttribute('selected', 'selected');
      }
      projectSelectEl.append(project);
    });
  }

  function addProjectEventListener() {
    const projectsNodes = document.querySelectorAll('.project');
    for (let i = 0; i < projectsNodes.length; i += 1) {
      const projectNames = taskLibraryObj.getProjectNames();
      const node = projectsNodes[i];
      node.addEventListener('click', () => {
        chooseCategoryAndUpdateUI(node, projectNames[i]);
        updateProjectSelectEl(projectNames[i]);
      });
    }
  }

  function showProjects(projectArr, projectsEl) {
    // eslint-disable-next-line no-param-reassign
    projectsEl.innerHTML = '';

    projectArr.forEach((project) => {
      // eslint-disable-next-line no-use-before-define
      const projectElement = createProjectElement(project);
      projectsEl.appendChild(projectElement);
    });
    addProjectEventListener();
  }

  function createProjectElement(project) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');

    const projectNameDiv = document.createElement('div');
    projectNameDiv.classList.add('project-name');
    projectNameDiv.textContent = project;

    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('delete-project-button');
    deleteProjectButton.textContent = 'X';
    deleteProjectButton.addEventListener('click', (e) => {
      const projectsContainer = document.querySelector('.projects-container');
      if (taskLibraryObj.getProjectNames().length < 1) {
        createPage('inbox');
        chooseCategoryAndUpdateUI(inboxCategory, 'inbox');
        updateProjectSelectEl('inbox');
      }
      taskLibraryObj.deleteProject(project);
      showProjects(taskLibraryObj.getProjectNames(), projectsContainer);
      e.stopPropagation();
    });

    projectContainer.append(projectNameDiv, deleteProjectButton);

    return projectContainer;
  }

  return {
    toggleAppearanceFlex,
    createPage,
    showProjects,
    chooseCategory,
    chooseCategoryAndUpdateUI,
    updateTaskForm,
    updateProjectSelectEl,
  };
}
