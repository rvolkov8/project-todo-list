import './css-files/inbox-page.css';

export default function pageCreator() {
  function createInboxPage(domControllerObj) {
    const mainContentEl = document.querySelector('.main-content');

    // Creates inbox title element
    const inboxTitle = document.createElement('div');
    inboxTitle.classList.add('inbox-title');
    inboxTitle.textContent = 'Inbox';
    // Appends inbox title element to the main section
    mainContentEl.append(inboxTitle);

    // Creates inbox projects div
    const inboxTasksDiv = document.createElement('div');
    inboxTasksDiv.classList.add('inbox-tasks');
    inboxTasksDiv.style.display = 'none';
    // Appends inbox projects div to the main section
    mainContentEl.append(inboxTitle, inboxTasksDiv);

    // Append the new task element to the main section
    mainContentEl.append(domControllerObj.addNewTaskEl());
  }

  return { createInboxPage };
}
