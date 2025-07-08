const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task' + (task.completed ? ' completed' : '');

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.className = 'complete';
    completeBtn.innerHTML = '✔';
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerHTML = '🗑';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);

    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

renderTasks();
