let tasks = [];
let currentLayout = 'list';

// Retrieve tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

// Add task modal
const addTaskModal = document.getElementById('add-task-modal');
const addTaskInput = document.getElementById('task-input');
const addTaskDate = document.getElementById('task-date');
const addTaskSubmit = document.getElementById('add-task-submit');

addTaskSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const taskName = addTaskInput.value.trim();
  const taskDate = addTaskDate.value.trim();
  if (taskName && taskDate) {
    tasks.push({ name: taskName, date: taskDate });
    addTaskInput.value = '';
    addTaskDate.value = '';
    addTaskModal.classList.remove('show');
    renderTasks();
    // To store the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
});

// Add task button
const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => {
  addTaskModal.classList.add('show');
});
// Different layout buttons
const listLayoutBtn = document.getElementById('list-layout-btn');
listLayoutBtn.className = 'list-btn'; 

const calendarLayoutBtn = document.getElementById('calendar-layout-btn');
calendarLayoutBtn.className = 'calendar-btn';

const boardLayoutBtn = document.getElementById('board-layout-btn');
boardLayoutBtn.className = 'board-btn'; 

listLayoutBtn.addEventListener('click', () => {
  currentLayout = 'list';
  document.getElementById('list-layout').style.display = 'block';
  document.getElementById('calendar-layout').style.display = 'none';
  document.getElementById('board-layout').style.display = 'none';
  renderTasks();
});

calendarLayoutBtn.addEventListener('click', () => {
  currentLayout = 'calendar';
  document.getElementById('list-layout').style.display = 'none';
  document.getElementById('calendar-layout').style.display = 'block';
  document.getElementById('board-layout').style.display = 'none';
  renderTasks();
});

boardLayoutBtn.addEventListener('click', () => {
  currentLayout = 'board';
  document.getElementById('list-layout').style.display = 'none';
  document.getElementById('calendar-layout').style.display = 'none';
  document.getElementById('board-layout').style.display = 'block';
  renderTasks();
});
// Render tasks
function renderTasks() {
    if (currentLayout === 'list') {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskListItem = document.createElement('li');
            taskListItem.textContent = `${task.name} - ${task.date}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-'; 
            deleteButton.id = 'delete-btn';
            deleteButton.classList.add('delete-btn-list'); 
            
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                // Update local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            taskListItem.appendChild(deleteButton);
            taskList.appendChild(taskListItem);
        });
    } else if (currentLayout === 'calendar') {
        const calendarContainer = document.getElementById('calendar-container');
        calendarContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskDate = new Date(task.date);
            const taskDay = taskDate.getDate();
            const taskMonth = taskDate.getMonth() + 1;
            const taskYear = taskDate.getFullYear();
            const calendarItem = document.createElement('div');
            calendarItem.textContent = `${task.name} - ${taskMonth}/${taskDay}/${taskYear}`;
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-'; // Replace text content to fit button size
            deleteButton.id = 'delete-btn';
            
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                // Update local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            calendarItem.appendChild(deleteButton);
            calendarContainer.appendChild(calendarItem);
        });
    } else if (currentLayout === 'board') {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskBoardItem = document.createElement('div');
            taskBoardItem.textContent = task.name;
            taskBoardItem.className = 'board-task'; // Use 'board-task' class here
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-'; // Replace text content to fit button size
            deleteButton.id = 'delete-btn';
            deleteButton.classList.add('delete-btn-board'); // Add class for board view
            
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                // Update local storage
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            taskBoardItem.appendChild(deleteButton);
            boardContainer.appendChild(taskBoardItem);
        });
    }
}

// Initialize
renderTasks();
