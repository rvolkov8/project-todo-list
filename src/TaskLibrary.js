import DateObj from './Date';

// Factory functions to create library for all the tasks
export default function taskLibrary() {
  const date = DateObj();
  const tasksArr = localStorage.getItem('tasksArr')
    ? JSON.parse(localStorage.getItem('tasksArr'))
    : [];

  const projectsArr = localStorage.getItem('projectsArr')
    ? JSON.parse(localStorage.getItem('projectsArr'))
    : [];

  let projectNamesArr = [];

  function createTask(taskInfoArr) {
    return {
      title: taskInfoArr[0],
      description: taskInfoArr[1],
      dueDate: taskInfoArr[2],
      priority: taskInfoArr[3],
      project: taskInfoArr[4],
    };
  }

  function addTask(task) {
    tasksArr.push(task);
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
  }

  function getAllTasks() {
    return tasksArr;
  }

  function sortTasksByPriority(projectTasks) {
    projectTasks.sort((a, b) => a.priority - b.priority);
    return projectTasks;
  }

  function getTasks(page) {
    const inboxTasksArr = [];
    const todayTasksArr = [];
    const thisWeekArr = [];
    const projectTasksArr = [];

    const thisWeekDates = date.getDatesOfWeekStartingFromMonday(date.currDate);

    tasksArr.forEach((task) => {
      if (task.project === 'inbox') inboxTasksArr.push(task);
      if (task.project === page) projectTasksArr.push(task);
      if (task.dueDate === date.formatDate(date.currDate))
        todayTasksArr.push(task);
      if (thisWeekDates.includes(task.dueDate)) thisWeekArr.push(task);
    });

    switch (page) {
      case 'inbox':
        return sortTasksByPriority(inboxTasksArr);
      case 'today':
        return sortTasksByPriority(todayTasksArr);
      case 'this-week':
        return sortTasksByPriority(thisWeekArr);
      default:
        return sortTasksByPriority(projectTasksArr);
    }
  }

  function deleteTask(task) {
    const indexToDelete = tasksArr.findIndex((obj) => obj.title === task.title);
    tasksArr.splice(indexToDelete, 1);
    localStorage.setItem('tasksArr', JSON.stringify(tasksArr));
  }

  function getProjectNames() {
    projectNamesArr = [];
    projectsArr.forEach((project) => {
      projectNamesArr.push(project.name);
    });
    return projectNamesArr;
  }

  function addProject(projectName) {
    projectsArr.push({ name: projectName });
    localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
  }

  function deleteProject(project) {
    const indexToDelete = projectsArr.findIndex((obj) => obj.name === project);
    projectsArr.splice(indexToDelete, 1);
    localStorage.setItem('projectsArr', JSON.stringify(projectsArr));
  }

  return {
    createTask,
    addTask,
    getAllTasks,
    getTasks,
    addProject,
    getProjectNames,
    deleteTask,
    deleteProject,
  };
}
