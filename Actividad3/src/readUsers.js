const { get } = require('http');

const fs = require('fs').promises;

async function getUser() {
    try {
        const data = await fs.readFile('users.json');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function getUser(id) {
    const users = await getUser();
    return users.find(user => user.id === id);
}

async function updateUser(id, user) {
    const users = await getUser();
    const index = users.findIndex(user => user.id === id);
    await fs.writeFile('users.json', JSON.stringify(users, null, 4));
}

async function createUser(user) {
    const users = await getUser();
    const lastId = users.length > 0 ? users[users.length - 1].id : 0;
    user.id = lastId + 1;
    users.push(user);
    await fs.writeFile('users.json', JSON.stringify(users, null, 4));
}

async function deleteUser(id) {
    const users = await getUser();
    const index = users.findIndex(user => user.id === id);
    users.splice(index, 1);
    await fs.writeFile('users.json', JSON.stringify(users, null, 4));
}

module.exports = {
    getUser,
    getUser,
    updateUser,
    createUser,
    deleteUser
};
