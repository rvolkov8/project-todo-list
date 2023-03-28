// Factory functions to create library for all the tasks
export default function taskLibrary() {
  const taskArr = [];

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
    taskArr.push(task);
  }

  function getAllTasks() {
    return taskArr;
  }

  function getInboxTasks() {
    const inboxTasksArr = [];
    for (let i = 0; i < taskArr.length; i += 1) {
      const task = taskArr[i];
      if (task.project === 'inbox') {
        inboxTasksArr.push(task);
      }
    }
    return inboxTasksArr;
  }

  return {
    createTask,
    addTask,
    getAllTasks,
    getInboxTasks,
  };
}
