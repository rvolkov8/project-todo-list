import './css-files/task.css';
import './css-files/add-task-el.css';
import DateObj from './Date';

// Factory functions to DOM controller
export default function domController(taskLibrary) {
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
      taskLibrary.deleteTask(task);
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

  function showProjects(projectArr, projectsEl) {
    projectArr.forEach((project) => {
      const projectDiv = document.createElement('div');
      projectDiv.classList.add('project');

      const projectNameDiv = document.createElement('div');
      projectNameDiv.classList.add('project-name');
      projectNameDiv.textContent = project;

      projectDiv.append(projectNameDiv);
      projectsEl.append(projectDiv);
    });
  }

  return {
    toggleAppearanceFlex,
    showTasks,
    showProjects,
  };
}
