import './css-files/add-task-form.css';
import DateObj from './Date';

// Factory function to create task form object
export default function TaskForm() {
  const date = DateObj();
  let taskName;
  let taskDescription;
  let taskDueDate;
  let taskPriority;
  let taskProject;

  function createTaskForm() {
    // Creates Add task form element
    const addTaskFormEl = document.createElement('form');
    addTaskFormEl.classList.add('add-task-form');
    addTaskFormEl.style.display = 'none';

    // Creates the elements of the form
    // Creates task name input field
    taskName = document.createElement('INPUT');
    taskName.setAttribute('type', 'text');
    taskName.setAttribute('placeholder', 'Task name');
    taskName.classList.add('task-name');
    // Creates task description input field
    taskDescription = document.createElement('INPUT');
    taskDescription.setAttribute('type', 'text');
    taskDescription.setAttribute('placeholder', 'Description');
    taskDescription.classList.add('task-description');
    // Creates a container for additional task info
    const additionalInfoContainer = document.createElement('div');
    additionalInfoContainer.classList.add('additional-info');
    // Creates task due date input field
    taskDueDate = document.createElement('INPUT');
    taskDueDate.setAttribute('type', 'date');
    taskDueDate.value = date.formatDate(date.currDate);
    taskDueDate.classList.add('task-due-date');
    // Creates task priority input field
    taskPriority = document.createElement('SELECT');
    taskPriority.setAttribute('id', 'priority');
    taskPriority.classList.add('task-priority');

    const priorityOne = document.createElement('option');
    priorityOne.setAttribute('value', 'priorityOne');
    priorityOne.textContent = 'Priority 1';
    const priorityTwo = document.createElement('option');
    priorityTwo.setAttribute('value', 'priorityTwo');
    priorityTwo.textContent = 'Priority 2';
    const priorityThree = document.createElement('option');
    priorityThree.setAttribute('value', 'priorityThree');
    priorityThree.textContent = 'Priority 3';
    const priorityFour = document.createElement('option');
    priorityFour.setAttribute('value', 'priorityFour');
    priorityFour.textContent = 'Priority 4';
    const priorityFive = document.createElement('option');
    priorityFive.setAttribute('value', 'priorityFive');
    priorityFive.textContent = 'Priority 5';

    taskPriority.append(
      priorityOne,
      priorityTwo,
      priorityThree,
      priorityFour,
      priorityFive
    );
    // Appends elements to the additional info container
    additionalInfoContainer.append(taskDueDate, taskPriority);
    // Creates task upload container
    const taskUploadContainer = document.createElement('div');
    taskUploadContainer.classList.add('task-upload-container');
    // Creates elements for the task upload container
    // Creates project input field
    taskProject = document.createElement('SELECT');
    taskProject.setAttribute('id', 'project');
    taskProject.classList.add('task-project');

    const projectOne = document.createElement('option');
    projectOne.setAttribute('value', 'inbox');
    projectOne.textContent = 'Inbox';

    taskProject.append(projectOne);
    // Creates task form buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');
    // Creates buttons for the form
    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.classList.add('cancel-button');
    cancelButton.textContent = 'Cancel';

    const addTaskButton = document.createElement('button');
    addTaskButton.classList.add('add-task-button');
    addTaskButton.setAttribute('type', 'button');
    addTaskButton.textContent = 'Add task';
    // Appends the button to the buttons container
    buttonsContainer.append(cancelButton, addTaskButton);
    // Appends the element to the task upload container
    taskUploadContainer.append(taskProject, buttonsContainer);
    // Appends all the elements to the form
    addTaskFormEl.append(
      taskName,
      taskDescription,
      additionalInfoContainer,
      taskUploadContainer
    );

    return addTaskFormEl;
  }

  function getTaskInfo() {
    return [
      taskName.value,
      taskDescription.value,
      taskDueDate.value,
      taskPriority.value,
      taskProject.value,
    ];
  }

  function clearForm() {
    taskName.value = 'It is an example of task name';
    taskDescription.value =
      'It is an example of task description in one sentence';
    taskDueDate.value = date.formatDate(date.currDate);
    taskPriority.selectedIndex = 0;
    taskProject.selectedIndex = 0;
  }

  return {
    createTaskForm,
    getTaskInfo,
    clearForm,
  };
}
