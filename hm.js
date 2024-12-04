document.addEventListener('DOMContentLoaded', function() {
    const taskList = new TaskLinkedList();
    const mlPriority = new TaskPriorityML();
    let currentFilter = 'all';

    // Element References
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskButton = document.querySelector('button[onclick="addTask()"]');
    const filterButtons = document.querySelectorAll('.filter-container button');
    const taskListElement = document.getElementById('taskList');

    // Tambahkan Event Listener untuk Tombol Tambah Tugas
    if (addTaskButton) {
        addTaskButton.addEventListener('click', function() {
            if (!taskInput.value || !dateInput.value) {
                alert('Harap isi semua field');
                return;
            }

            let priority = prioritySelect.value === 'auto' 
                ? mlPriority.calculatePriority(dateInput.value) 
                : prioritySelect.value;

            taskList.addTask(taskInput.value, dateInput.value, priority);
            updateTaskDisplay();
            
            // Reset Input
            taskInput.value = '';
            dateInput.value = '';
        });
    }

    // Tambahkan Event Listener untuk Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter') || 'all';
            
            // Hapus kelas active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Tambahkan kelas active ke tombol yang diklik
            this.classList.add('active');

            currentFilter = filter;
            updateTaskDisplay();
        });
    });

    function deleteTask(task) {
        taskList.deleteTask(task);
        updateTaskDisplay();
    }

    function updateTaskDisplay() {
        if (!taskListElement) return;
        
        taskListElement.innerHTML = '';
        
        const tasks = taskList.getAllTasks();
        const filteredTasks = tasks.filter(task => 
            currentFilter === 'all' || task.priority === currentFilter
        );

        filteredTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task-item';
            
            const date = new Date(task.date).toLocaleString();
            
            taskElement.innerHTML = `
                <div>
                    <span>${task.task}</span>
                    <span style="margin-left: 10px; color: #666;">${date}</span>
                </div>
                <div>
                    <span class="priority-tag priority-${task.priority}">${task.priority}</span>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            // Tambahkan event listener untuk tombol delete
            const deleteButton = taskElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                deleteTask(task.task);
            });
            
            taskListElement.appendChild(taskElement);
        });
    }
});