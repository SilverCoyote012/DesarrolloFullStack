const fs = require('fs').promises;

async function getTasks() {
    try {
        const data = await fs.readFile('tasks.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function getTask(id) {
    const tasks = await getTasks();
    return tasks.find(task => task.id === id);
}

async function updateTask(id, task) {
    const tasks = await getTasks();
    const index = tasks.findIndex(task => task.id === id);
    task = { id: index+1, ...task };
    tasks.splice(index, 1, task)
    await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 4));
}

async function createTask(task) {
    const tasks = await getTasks();
    const lastId = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
    task.id = lastId + 1;
    tasks.push(task);
    await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 4));
}

async function deleteTask(id) {
    const tasks = await getTasks();
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1);
    await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 4));
}

module.exports = {
    getTasks,
    getTask,
    updateTask,
    createTask,
    deleteTask
};