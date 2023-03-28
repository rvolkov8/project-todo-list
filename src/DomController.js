import './css-files/task.css';
import './css-files/add-task-el.css';
import DateObj from './Date';

const date = DateObj();

// Factory functions to DOM controller
export default function domController() {
  function addNewTaskEl() {
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

    // Returns the Add new task button element
    return addTaskEl;
  }

  function formatTaskDate(dateStr) {
    const dateArr = dateStr.split('-');
    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];
    console.log(month);
    let formattedMonth;
    console.log(formattedMonth);

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

    if (dateStr === date.formatDate()) {
      return 'Today';
    }
    return `${day} ${formattedMonth} ${year}`;
  }

  function showTasks(tasksArr, tasksEl) {
    // eslint-disable-next-line no-param-reassign
    tasksEl.innerHTML = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const task of tasksArr) {
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');

      const checkBoxContainer = document.createElement('div');
      checkBoxContainer.classList.add('checkbox-container');

      const checkBox = document.createElement('INPUT');
      checkBox.setAttribute('type', 'checkbox');

      checkBoxContainer.append(checkBox);

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

      taskContainer.append(checkBoxContainer, taskInfoContainer);

      tasksEl.append(taskContainer);
    }
  }

  function toggleAppearanceFlex(element) {
    const el = element;
    if (el.style.display === 'none') {
      el.style.display = 'flex';
    } else if (el.style.display === 'flex') {
      el.style.display = 'none';
    }
  }

  return {
    addNewTaskEl,
    showTasks,
    toggleAppearanceFlex,
  };
}
