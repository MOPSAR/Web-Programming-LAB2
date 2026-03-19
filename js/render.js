function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = 'todo-item';
  item.draggable = true;
  item.dataset.id = task.id;

  const info = document.createElement('div');
  info.className = 'todo-item__info';

  const text = document.createElement('h3');
  text.className = 'todo-item__title';
  text.textContent = task.title;

  const date = document.createElement('p');
  date.className = 'todo-item__date';
  date.textContent = task.date ? `Срок: ${task.date}` : 'Без даты';

  info.append(text, date);

  const actions = document.createElement('div');
  actions.className = 'todo-item__actions';

  const editButton = document.createElement('button');
  editButton.className = 'todo-item__edit';
  editButton.textContent = 'Редактировать';

  editButton.addEventListener('click', () => {
    startEditMode(task.id);
  });

  const toggleButton = document.createElement('button');
  toggleButton.className = 'todo-item__toggle';
  toggleButton.textContent = task.completed ? 'Не выполнено' : 'Выполнено';

  toggleButton.addEventListener('click', () => {
    toggleTask(task.id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.className = 'todo-item__delete';
  deleteButton.textContent = 'Удалить';

  deleteButton.addEventListener('click', () => {
    deleteTask(task.id);
  });

  actions.append(editButton, toggleButton, deleteButton);
  item.append(info, actions);

  if (task.completed) {
    item.classList.add('todo-item--completed');
  }
  item.addEventListener('dragstart', () => {
  draggedTaskId = task.id;
  item.classList.add('todo-item--dragging');
});

item.addEventListener('dragend', () => {
  draggedTaskId = null;
  item.classList.remove('todo-item--dragging');
});

item.addEventListener('dragover', (event) => {
  event.preventDefault();
});

item.addEventListener('drop', () => {
  moveTask(draggedTaskId, task.id);
});
  return item;
}

function renderTasks() {
  list.innerHTML = '';

  let filteredTasks = tasks.filter((task) => {
    return task.title.toLowerCase().includes(searchValue.toLowerCase());
  });

  if (state.statusValue === 'active') {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  }

  if (state.statusValue === 'completed') {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  if (state.sortValue === 'date-asc') {
    filteredTasks.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(a.date) - new Date(b.date);
    });
  }

  if (state.sortValue === 'date-desc') {
    filteredTasks.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
  }

  if (filteredTasks.length === 0) {
    const emptyMessage = document.createElement('li');
    emptyMessage.className = 'todo-list__empty';
    emptyMessage.textContent = searchValue ? 'Ничего не найдено' : 'Список задач пуст';
    list.append(emptyMessage);
    return;
  }

  filteredTasks.forEach((task) => {
    const taskElement = createTaskElement(task);
    list.append(taskElement);
  });
}