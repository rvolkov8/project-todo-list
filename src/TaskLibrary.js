import DateObj from './Date';

const date = DateObj();
// Factory functions to create library for all the tasks
export default function taskLibrary() {
  const tasksArr = [];

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

  // eslint-disable-next-line consistent-return
  function getTasks(page) {
    const inboxTasksArr = [];
    const todayTasksArr = [];
    const thisWeekArr = [];

    const thisWeekDates = date.getDatesOfWeekStartingFromMonday(date.currDate);

    tasksArr.forEach((task) => {
      if (task.project === 'inbox') inboxTasksArr.push(task);
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
  }

  return {
    createTask,
    addTask,
    getAllTasks,
    getTasks,
  };
}
