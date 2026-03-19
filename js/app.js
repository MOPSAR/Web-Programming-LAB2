const tasks = loadTasks();
let searchValue = '';
let statusValue = 'all';
let sortValue = 'default';

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

function deleteTask(taskId) {
  const index = tasks.findIndex((item) => item.id === taskId);

  if (index !== -1) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}

function toggleTask(taskId) {
  const currentTask = tasks.find((item) => item.id === taskId);

  if (currentTask) {
    currentTask.completed = !currentTask.completed;
    saveTasks(tasks);
    renderTasks();
  }
}

function startEditMode(taskId) {
  list.innerHTML = '';

  tasks.forEach((current) => {
    if (current.id === taskId) {
      const item = document.createElement('li');
      item.className = 'todo-item';

      const editWrap = document.createElement('div');
      editWrap.className = 'todo-item__edit-wrap';

      const editTitleInput = document.createElement('input');
      editTitleInput.className = 'todo-item__edit-input';
      editTitleInput.type = 'text';
      editTitleInput.value = current.title;

      const editDateInput = document.createElement('input');
      editDateInput.className = 'todo-item__edit-date';
      editDateInput.type = 'date';
      editDateInput.value = current.date;

      const saveButton = document.createElement('button');
      saveButton.className = 'todo-item__save';
      saveButton.textContent = 'Сохранить';

      const cancelButton = document.createElement('button');
      cancelButton.className = 'todo-item__cancel';
      cancelButton.textContent = 'Отмена';

      saveButton.addEventListener('click', () => {
        const value = editTitleInput.value.trim();

        if (!value) {
          return;
        }

        current.title = value;
        current.date = editDateInput.value;
        saveTasks(tasks);
        renderTasks();
      });

      cancelButton.addEventListener('click', () => {
        renderTasks();
      });

      editWrap.append(editTitleInput, editDateInput, saveButton, cancelButton);
      item.append(editWrap);
      list.append(item);
    } else {
      list.append(createTaskElement(current));
    }
  });
}

searchInput.addEventListener('input', (event) => {
  searchValue = event.target.value;
  renderTasks();
});

statusFilter.addEventListener('change', (event) => {
  statusValue = event.target.value;
  renderTasks();
});

sortSelect.addEventListener('change', (event) => {
  sortValue = event.target.value;
  renderTasks();
});

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
  saveTasks(tasks);
  renderTasks();

  form.reset();
});