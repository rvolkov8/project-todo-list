import DateObj from './Date';

const date = DateObj();
// Factory functions to create library for all the tasks
export default function taskLibrary() {
  const tasksArr = [];
  const projectsArr = [];
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
  }

  function getAllTasks() {
    return tasksArr;
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
        return inboxTasksArr;
      case 'today':
        return todayTasksArr;
      case 'this-week':
        return thisWeekArr;
      default:
        break;
    }
    return projectTasksArr;
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
  }

  return {
    createTask,
    addTask,
    getAllTasks,
    getTasks,
    addProject,
    getProjectNames,
  };
}
