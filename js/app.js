const tasks = [];

const app = document.createElement('main');
app.className = 'app';

const container = document.createElement('section');
container.className = 'todo';

const title = document.createElement('h1');
title.className = 'todo__title';
title.textContent = 'To-Do List';

const controls = document.createElement('section');
controls.className = 'todo__controls';

const form = document.createElement('form');
form.className = 'todo-form';

const taskInput = document.createElement('input');
taskInput.className = 'todo-form__input';
taskInput.type = 'text';
taskInput.placeholder = 'Введите задачу';

const dateInput = document.createElement('input');
dateInput.className = 'todo-form__date';
dateInput.type = 'date';

const addButton = document.createElement('button');
addButton.className = 'todo-form__button';
addButton.type = 'submit';
addButton.textContent = 'Добавить';

form.append(taskInput, dateInput, addButton);

const searchInput = document.createElement('input');
searchInput.className = 'todo__search';
searchInput.type = 'text';
searchInput.placeholder = 'Поиск по названию';

const filterBox = document.createElement('div');
filterBox.className = 'todo__filters';

const statusFilter = document.createElement('select');
statusFilter.className = 'todo__select';

const allOption = document.createElement('option');
allOption.value = 'all';
allOption.textContent = 'Все';

const activeOption = document.createElement('option');
activeOption.value = 'active';
activeOption.textContent = 'Невыполненные';

const completedOption = document.createElement('option');
completedOption.value = 'completed';
completedOption.textContent = 'Выполненные';

statusFilter.append(allOption, activeOption, completedOption);

const sortSelect = document.createElement('select');
sortSelect.className = 'todo__select';

const sortDefault = document.createElement('option');
sortDefault.value = 'default';
sortDefault.textContent = 'Без сортировки';

const sortAsc = document.createElement('option');
sortAsc.value = 'date-asc';
sortAsc.textContent = 'Сначала ранние';

const sortDesc = document.createElement('option');
sortDesc.value = 'date-desc';
sortDesc.textContent = 'Сначала поздние';

sortSelect.append(sortDefault, sortAsc, sortDesc);

filterBox.append(statusFilter, sortSelect);

controls.append(form, searchInput, filterBox);

const listSection = document.createElement('section');
listSection.className = 'todo__list-section';

const list = document.createElement('ul');
list.className = 'todo-list';

listSection.append(list);

container.append(title, controls, listSection);
app.append(container);
document.body.append(app);

function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = 'todo-item';

  const text = document.createElement('span');
  text.className = 'todo-item__text';
  text.textContent = `${task.title} (${task.date || 'без даты'})`;

  item.append(text);

  return item;
}

function renderTasks() {
  list.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    list.append(taskElement);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = taskInput.value.trim();
  const date = dateInput.value;

  if (!title) {
    return;
  }

  const task = {
    id: Date.now(),
    title,
    date,
    completed: false
  };

  tasks.push(task);
  renderTasks();

  form.reset();
});