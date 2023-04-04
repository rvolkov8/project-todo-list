import taskLibrary from './TaskLibrary';
import pageController from './PageController';
import domController from './DomController';

const taskLibraryObj = taskLibrary();
const domControllerObj = domController(taskLibraryObj);
const pageControllerObj = pageController(taskLibraryObj, domControllerObj);

const sideBarEl = document.querySelector('.side-bar');

const menuIcon = document.querySelector('.menu-icon');
const homeIcon = document.querySelector('.home-icon');
const logoEl = document.querySelector('.logo');

const inboxCategory = document.querySelector('.category.inbox');
const todayCategory = document.querySelector('.category.today');
const thisWeekCategory = document.querySelector('.category.this-week');

function createProjectOption(projectName) {
  const project = document.createElement('option');
  project.setAttribute('value', projectName);
  project.textContent = projectName;
  return project;
}

function updateProjectSelectEl() {
  const projectNames = taskLibraryObj.getProjectNames();
  const projectSelectEl = document.querySelector('.task-project');
  projectSelectEl.innerHTML = '';
  projectSelectEl.append(createProjectOption('inbox'));
  projectNames.forEach((projectName) => {
    const project = createProjectOption(projectName);
    projectSelectEl.append(project);
  });
}

function updateCategory(categoryNode, categoryName) {
  pageControllerObj.chooseCategoryAndUpdateUI(categoryNode, categoryName);
  updateProjectSelectEl();
}

menuIcon.addEventListener('click', () => {
  domControllerObj.toggleAppearanceFlex(sideBarEl);
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
  // get user input
  const projectNameInputField = document.querySelector('.project-name-input');
  const projectName = projectNameInputField.value;
  // add project to the projects array in the task library
  taskLibraryObj.addProject(projectName);

  pageControllerObj.updateTaskForm(projectName);
  // show all the element of project array in the projects element
  domControllerObj.showProjects(
    taskLibraryObj.getProjectNames(),
    projectsContainer
  );
  // clear user input field
  projectNameInputField.value = '';

  const projectsNodes = document.querySelectorAll('.project');
  for (let i = 0; i < projectsNodes.length; i += 1) {
    const projectNames = taskLibraryObj.getProjectNames();
    const node = projectsNodes[i];
    node.addEventListener('click', () => {
      pageControllerObj.chooseCategoryAndUpdateUI(node, projectNames[i]);
      updateProjectSelectEl();
    });
  }
});

// Creates inbox page content
pageControllerObj.createPage('inbox');
domControllerObj.showProjects(
  taskLibraryObj.getProjectNames(),
  projectsContainer
);
pageControllerObj.chooseCategoryAndUpdateUI(inboxCategory, 'inbox');
