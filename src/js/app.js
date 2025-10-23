// 1. Select DOM elements
const taskInput = document.querySelector('.app-input');
const taskForm = document.querySelector('.app-form');
const taskList = document.querySelector('.app-list');

// 2. Event listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskActions);

// 3. Add Task
function addTask(e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === '') return;

  const li = createTaskElement(text);
  taskList.appendChild(li);
  taskInput.value = '';
}

// 4. Handle actions (delete/complete/edit)
function handleTaskActions(e) {
  const target = e.target;
  const li = target.closest('.app-item');

  // Toggle complete
  if (target.classList.contains('app-check')) {
    li.classList.toggle('completed');
  }

  // Delete task
  if (target.classList.contains('delete-btn')) {
    li.remove();
  }

  // Edit task
  if (target.classList.contains('edit-btn')) {
    const span = li.querySelector('.app-text');
    const newText = prompt('Edit your task:', span.textContent);
    if (newText && newText.trim() !== '') {
      span.textContent = newText.trim();
    }
  }
}

// 5. Create task DOM structure
function createTaskElement(text) {
  const li = document.createElement('li');
  li.classList.add('app-item');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('app-check');

  const span = document.createElement('span');
  span.classList.add('app-text');
  span.textContent = text;

  const actions = document.createElement('div');
  actions.classList.add('app-actions');

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  editBtn.textContent = '✏️';

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.textContent = '🗑️';

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  // ✅ SAME ORDER AS STATIC HTML
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  return li;
}
