// Pastikan tidak ada console.log atau error yang tidak perlu
class Node {
    constructor(task, date, priority) {
        this.task = task;
        this.date = date;
        this.priority = priority;
        this.next = null;
    }
}

class TaskLinkedList {
    constructor() {
        this.head = null;
    }

    addTask(task, date, priority) {
        if (!task || !date) return; // Validasi input

        const newNode = new Node(task, date, priority || 'low');
        
        if (!this.head) {
            this.head = newNode;
            return;
        }

        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    deleteTask(task) {
        if (!this.head) return;

        if (this.head.task === task) {
            this.head = this.head.next;
            return;
        }

        let current = this.head;
        while (current.next) {
            if (current.next.task === task) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }

    getAllTasks() {
        const tasks = [];
        let current = this.head;
        
        while (current) {
            tasks.push({
                task: current.task,
                date: current.date,
                priority: current.priority
            });
            current = current.next;
        }
        
        return tasks;
    }
}