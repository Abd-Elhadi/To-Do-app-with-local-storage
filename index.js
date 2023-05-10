let userInput = document.querySelector('.container .form .input');
let addTask = document.querySelector('.container .form .add');

function getTaksDiv() {
    let tasks = document.querySelector('.container .tasks');
    return tasks;
}

let tasks = getTaksDiv();
tasks.style.cssText = 'flex-wrap: wrap; padding-bottom: 10px';

function addTasktoTasks(name) {
    let task = document.createElement('div');
    let className = name.split(" ").join('-').toLowerCase();
    task.className = className;
    task.style.cssText = 'display: flex; justify-content: space-between; width: 100%; margin-bottom: 10px;'
    let span = document.createElement('span');
    let taskName = document.createTextNode(name);
    span.appendChild(taskName);

    span.style.cssText = 'border-radius: 6px; width: 100%; background-color: white; padding: 10px; margin-right: 10px; font-size: 20px';

    let btn = document.createElement('button');
    btn.style.cssText = 'border: none; border-radius: 6px; background-color: red; color: white; cursor: pointer; font-weight: bold; text-align: center; padding-lright: 10px';
    btn.className = className;
    let btnName = document.createTextNode('Remove');
    btn.appendChild(btnName);

    task.appendChild(span);
    task.appendChild(btn);
    tasks.appendChild(task);
}


function getAllNames() {
    let allNames = [];
    let allTasks = tasks.querySelectorAll('div span');
    allTasks.forEach(task => {
        allNames.push(task.innerHTML);
    });
    return allNames;
}


addTask.addEventListener('click', (e) => {
    if (userInput.value) {
        let name = userInput.value;
        addTasktoTasks(name);
        userInput.value = '';
    }
    let names = getAllNames();
    window.localStorage.setItem('names', JSON.stringify(names));
});

tasks.addEventListener('click', e => {
    if (e.target.nodeName.toLowerCase() === 'button') {
        e.target.parentNode.remove();
    }
    let names = getAllNames();
    window.localStorage.setItem('names', JSON.stringify(names));
});

window.onload = function () {
    let previousNames = JSON.parse(window.localStorage.getItem('names'));
    if (previousNames) {
        for (let i = 0; i < previousNames.length; i++) {
            addTasktoTasks(previousNames[i]);
        }
    }
}