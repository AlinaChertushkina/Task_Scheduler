// Получаем элементы из DOM
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
const noTasksPlaceholder = document.getElementById('no-tasks-placeholder');
const clearButton = document.getElementById('clear-button');

// Загружаем список задач из Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Обновляем список задач на странице
function updateTaskList() {
    // Удаляем все задачи из списка
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    // Добавляем новые задачи в список
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            task.completed = checkbox.checked;
            saveTasks();
        });
        const text = document.createTextNode(task.text);
        li.appendChild(checkbox);
        li.appendChild(text);
        taskList.appendChild(li);
    }
    // Показываем или скрываем уведомление о том, что задач нет
    if (tasks.length === 0) {
        taskList.style.display = 'none';
        noTasksPlaceholder.style.display = 'block';
        clearButton.disabled = true;
    } else {
        taskList.style.display = 'block';
        noTasksPlaceholder.style.display = 'none';
        clearButton.disabled = false;
    }
}

// Сохраняем список задач в Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Добавляем обработчик клика на кнопку "Добавить задачу"
addTaskButton.addEventListener('click', function () {
    const text = taskInput.value.trim();
    if (text !== '') {
        const task = { text: text, completed: false };
        tasks.push(task);
        saveTasks();
        taskInput.value = '';
        updateTaskList();
    }
});

// Добавляем обработчик клика на кнопку "Очистить список"
clearButton.addEventListener('click', function () {
    tasks = [];
    saveTasks();
    updateTaskList();
});

// Обновляем список задач на странице
updateTaskList();