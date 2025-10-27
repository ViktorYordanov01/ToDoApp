// DOM Elements
const taskInput = document.querySelector('.app-input');
const taskForm = document.querySelector('.app-form');
const taskList = document.querySelector('.app-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let tasks = [];  // Array of task objects: { id, text, completed }
let currentFilter = 'all';

// Load existing tasks from localStorage and render on startup
loadTasks();
renderTasks();

// Event Listeners
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === '') return;

  addTask(text);
  taskInput.value = '';
});

taskList.addEventListener('click', handleTaskActions);

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    setActiveFilterButton(btn);
    renderTasks();
  });
});

// --- Core Functions ---

function addTask(text) {
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

function handleTaskActions(e) {
  const target = e.target;
  const li = target.closest('.app-item');
  const id = Number(li.dataset.id);

  if (target.classList.contains('app-check')) {
    toggleTask(id);
  }

  if (target.classList.contains('delete-btn')) {
    deleteTask(id);
  }

  if (target.classList.contains('edit-btn')) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt('Edit your task:', task.text);
    if (newText && newText.trim() !== '') {
      task.text = newText.trim();
      saveTasks();
      renderTasks();
    }
  }
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// --- Rendering ---

function renderTasks() {
  taskList.innerHTML = '';

  let filtered = tasks;
  if (currentFilter === 'active') filtered = tasks.filter(t => !t.completed);
  if (currentFilter === 'completed') filtered = tasks.filter(t => t.completed);

  filtered.forEach(task => {
    const li = createTaskElement(task);
    taskList.appendChild(li);
  });
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.classList.add('app-item');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('app-check');
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.classList.add('app-text');
  span.textContent = task.text;

  if (task.completed) li.classList.add('completed');

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

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  return li;
}

// --- Local Storage Helpers ---

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) tasks = JSON.parse(saved);
}

// --- UI Helpers ---

function setActiveFilterButton(activeBtn) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  activeBtn.classList.add('active');
}
