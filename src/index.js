import pageController from './PageController';
import taskLibrary from './TaskLibrary';

const taskLibraryObj = taskLibrary();
const pageControllerObj = pageController(taskLibraryObj);

const inboxCategory = document.querySelector('.category.inbox');
const todayCategory = document.querySelector('.category.today');
const thisWeekCategory = document.querySelector('.category.this-week');

function chooseCategoryAndUpdateUI(categoryEl, categoryName) {
  if (!categoryEl.classList.contains('pressed')) {
    inboxCategory.classList.remove('pressed');
    todayCategory.classList.remove('pressed');
    thisWeekCategory.classList.remove('pressed');
    categoryEl.classList.add('pressed');
    pageControllerObj.chooseCategory(categoryName);
  }
}

// Creates inbox page content
pageControllerObj.createPage('inbox');
chooseCategoryAndUpdateUI(inboxCategory, 'inbox');

inboxCategory.addEventListener('click', () => {
  chooseCategoryAndUpdateUI(inboxCategory, 'inbox');
});

todayCategory.addEventListener('click', () => {
  chooseCategoryAndUpdateUI(todayCategory, 'today');
});

thisWeekCategory.addEventListener('click', () => {
  chooseCategoryAndUpdateUI(thisWeekCategory, 'this-week');
});
