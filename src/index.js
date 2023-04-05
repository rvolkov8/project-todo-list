import taskLibrary from './TaskLibrary';
import pageController from './PageController';

import './css-files/style.css';
import './css-files/top-bar.css';
import './css-files/side-bar.css';
import './css-files/page.css';
import './css-files/task.css';
import './css-files/add-task-el.css';
import './css-files/add-task-form.css';

const taskLibraryObj = taskLibrary();
const pageControllerObj = pageController(taskLibraryObj);

const sideBarEl = document.querySelector('.side-bar');
const menuIcon = document.querySelector('.menu-icon');
const homeIcon = document.querySelector('.home-icon');
const logoEl = document.querySelector('.logo');
const inboxCategory = document.querySelector('.category.inbox');
const todayCategory = document.querySelector('.category.today');
const thisWeekCategory = document.querySelector('.category.this-week');

function updateCategory(categoryNode, categoryName) {
  pageControllerObj.chooseCategoryAndUpdateUI(categoryNode, categoryName);
  pageControllerObj.updateProjectSelectEl(categoryName);
}

menuIcon.addEventListener('click', () => {
  pageControllerObj.toggleAppearanceFlex(sideBarEl);
});

homeIcon.addEventListener('click', () => {
  updateCategory(inboxCategory, 'inbox');
});

logoEl.addEventListener('click', () => {
  window.location.reload();
});

inboxCategory.addEventListener('click', () => {
  updateCategory(inboxCategory, 'inbox');
});

todayCategory.addEventListener('click', () => {
  updateCategory(todayCategory, 'today');
});

thisWeekCategory.addEventListener('click', () => {
  updateCategory(thisWeekCategory, 'this-week');
});

const projectsContainer = document.querySelector('.projects-container');
const addProjectButton = document.querySelector('.add-project-button');
const projectsForm = document.querySelector('.project-form');
const cancelProjectButton = document.querySelector('.cancel-button-project');
const addButton = document.querySelector('.add-button-project');

addProjectButton.addEventListener('click', () => {
  projectsForm.style.display = 'flex';
});

cancelProjectButton.addEventListener('click', () => {
  projectsForm.style.display = 'none';
});

addButton.addEventListener('click', () => {
  projectsContainer.innerHTML = '';

  const projectNameInputField = document.querySelector('.project-name-input');
  const projectName = projectNameInputField.value;

  if (projectName !== '') {
    taskLibraryObj.addProject(projectName);

    pageControllerObj.updateTaskForm(projectName);
  }
  pageControllerObj.showProjects(
    taskLibraryObj.getProjectNames(),
    projectsContainer
  );

  projectNameInputField.value = '';
});

// Creates inbox page content
pageControllerObj.createPage('inbox');
pageControllerObj.showProjects(
  taskLibraryObj.getProjectNames(),
  projectsContainer
);
pageControllerObj.chooseCategoryAndUpdateUI(inboxCategory, 'inbox');
pageControllerObj.updateProjectSelectEl('inbox');
