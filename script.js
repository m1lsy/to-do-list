let tasks = [];
let currentLayout = 'list';
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

const addTaskModal = document.getElementById('add-task-modal');
const addTaskInput = document.getElementById('task-input');
const addTaskDate = document.getElementById('task-date');
const addTaskSubmit = document.getElementById('add-task-submit');

addTaskSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    const taskName = addTaskInput.value.trim();
    const taskDate = addTaskDate.value.trim();
    const taskColor = document.getElementById('task-color').value;

    if (taskName && taskDate) {
        tasks.push({ name: taskName, date: taskDate, color: taskColor });

        addTaskInput.value = '';
        addTaskDate.value = '';
        addTaskModal.classList.remove('show');

        renderTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});

const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => {
    addTaskModal.classList.add('show');
});

const listLayoutBtn = document.getElementById('list-layout-btn');
const calendarLayoutBtn = document.getElementById('calendar-layout-btn');
const boardLayoutBtn = document.getElementById('board-layout-btn');

listLayoutBtn.addEventListener('click', () => {
    currentLayout = 'list';
    document.getElementById('list-layout').style.display = 'block';
    document.getElementById('calendar-layout').style.display = 'none';
    document.getElementById('board-layout').style.display = 'none';
    setActiveButton(listLayoutBtn);
    renderTasks();
});

calendarLayoutBtn.addEventListener('click', () => {
    currentLayout = 'calendar';
    document.getElementById('list-layout').style.display = 'none';
    document.getElementById('calendar-layout').style.display = 'block';
    document.getElementById('board-layout').style.display = 'none';
    setActiveButton(calendarLayoutBtn);
    updateCalendar();
});

boardLayoutBtn.addEventListener('click', () => {
    currentLayout = 'board';
    document.getElementById('list-layout').style.display = 'none';
    document.getElementById('calendar-layout').style.display = 'none';
    document.getElementById('board-layout').style.display = 'block';
    setActiveButton(boardLayoutBtn);
    renderTasks();
});

function setActiveButton(activeButton) {
    document.querySelectorAll('#layout-buttons button').forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

function updateCalendar() {
    const calendarDays = document.querySelector('.calendar-days');
    calendarDays.innerHTML = '';
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

    document.getElementById('calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear}`;

    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('calendar-day');
        calendarDays.appendChild(emptyDay);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = i;

        const dayTasks = tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.getDate() === i && taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
        });

        dayTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            taskElement.textContent = task.name;
            taskElement.style.backgroundColor = task.color;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-';
            deleteButton.classList.add('delete-btn-calendar');

            deleteButton.addEventListener('click', () => {
                const taskIndex = tasks.indexOf(task);
                tasks.splice(taskIndex, 1);
                renderTasks();
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            taskElement.appendChild(deleteButton);
            dayElement.appendChild(taskElement);
        });

        calendarDays.appendChild(dayElement);
    }
}

function renderTasks() {
    tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (currentLayout === 'list') {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.textContent = `${task.name} - ${task.date}`;
            listItem.style.backgroundColor = task.color;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-';
            deleteButton.classList.add('delete-btn-list');

            deleteButton.addEventListener('click', () => {
                const taskIndex = tasks.indexOf(task);
                tasks.splice(taskIndex, 1);
                renderTasks();
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        });
    } else if (currentLayout === 'board') {
        const boardContainer = document.getElementById('board-container');
        boardContainer.innerHTML = '';
        tasks.forEach(task => {
            const boardTask = document.createElement('div');
            boardTask.classList.add('board-task');
            boardTask.textContent = task.name;
            boardTask.style.backgroundColor = task.color;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '-';
            deleteButton.classList.add('delete-btn-board');

            deleteButton.addEventListener('click', () => {
                const taskIndex = tasks.indexOf(task);
                tasks.splice(taskIndex, 1);
                renderTasks();
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            boardTask.appendChild(deleteButton);
            boardContainer.appendChild(boardTask);
        });
    }
}

document.getElementById('calendar-prev').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
});

document.getElementById('calendar-next').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
});

// Initial render
setActiveButton(listLayoutBtn);
renderTasks();
updateCalendar(); 
