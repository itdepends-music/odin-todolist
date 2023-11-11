import todoList from './todoList';
import { format } from 'date-fns';
import editItemForm from './editItemForm';

const mainContentDiv = document.getElementById('mainContent');
let curProject = undefined;

const setCurProject = (project) => {
    curProject = project;
};

const getCurProject = () => {
    return curProject;
};

const setThisWeek = () => {
    curProject = {
        name: 'This Week',
        items: todoList.getThisWeekItems(),
        id: -1,
    };
};

const setToday = () => {
    curProject = {
        name: 'Today',
        items: todoList.getThisDayItems(),
        id: -1,
    };
};

const updateMainContent = () => {
    mainContentDiv.innerHTML = '';

    if (curProject === undefined) {
        return;
    }

    const heading = document.createElement('h2');
    heading.textContent = curProject.name;
    mainContentDiv.appendChild(heading);

    const itemsUl = document.createElement('ul');
    itemsUl.classList.add('todo-items');
    for (const item of curProject.items) {
        itemsUl.appendChild(showItem(item));
    }
    mainContentDiv.appendChild(itemsUl);

    if (curProject.id !== -1) {
        const newItemButton = document.createElement('button');
        newItemButton.classList.add('new-item-button');
        newItemButton.addEventListener('click', addNewItemListener);
        newItemButton.textContent = 'New Item';
        mainContentDiv.appendChild(newItemButton);
    }
};

const addNewItemListener = () => {
    const newItemId = todoList.addItem(
        curProject.id,
        '',
        new Date(),
        '',
        'low',
        false
    );
    const newItem = todoList.getItem(curProject.id, newItemId);
    editItemForm(newItem, true);
};

const showItem = (item) => {
    const itemElem = document.createElement('li');
    itemElem.classList.add('todo-item');
    itemElem.dataset.id = item.id;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = item.checked;
    checkBox.classList.add('checked');
    checkBox.addEventListener('change', (e) => {
        item.checked = e.target.checked;
    });
    itemElem.appendChild(checkBox);

    const title = document.createElement('span');
    title.classList.add('title');
    title.textContent = item.name;
    itemElem.appendChild(title);

    const priority = document.createElement('span');
    priority.classList.add('priority');
    priority.textContent = item.priority;
    itemElem.appendChild(priority);

    const date = document.createElement('span');
    date.classList.add('date');
    date.textContent = format(item.date, 'EEEE MMM d, y');
    itemElem.appendChild(date);

    const deleteButton = createItemButton(item.id, 'delete', () =>
        deleteHandler(item)
    );
    itemElem.appendChild(deleteButton);

    const editButton = createItemButton(item.id, 'edit', () =>
        editHandler(item)
    );
    itemElem.appendChild(editButton);

    const showDescriptionButton = createItemButton(
        item.id,
        'show-description',
        () => descriptionHandler(item)
    );
    itemElem.appendChild(showDescriptionButton);

    const description = document.createElement('div');
    description.classList.add('description');
    description.textContent = item.description;
    description.hidden = true;
    itemElem.appendChild(description);

    return itemElem;
};

const editHandler = (item) => {
    editItemForm(item, false);
};

const deleteHandler = (item) => {
    todoList.deleteItem(item.projectId, item.id);
    updateMainContent();
    todoList.saveProjects();
};

const descriptionHandler = (item) => {
    const description = mainContentDiv.querySelector(
        `li[data-id="${item.id}"] .description`
    );
    description.hidden = !description.hidden;
};

const createItemButton = (id, editOrDeleteOrShowDescription, handler) => {
    let icon;
    if (editOrDeleteOrShowDescription === 'edit') {
        icon = 'material-symbols:edit-outline';
    } else if (editOrDeleteOrShowDescription === 'delete') {
        icon = 'material-symbols:delete-outline';
    } else if (editOrDeleteOrShowDescription === 'show-description') {
        icon = 'material-symbols:expand-more';
    }

    const projectButton = document.createElement('button');
    projectButton.classList.add(editOrDeleteOrShowDescription);
    projectButton.addEventListener('click', handler);

    const iconElem = document.createElement('iconify-icon');
    iconElem.setAttribute('icon', icon);
    projectButton.appendChild(iconElem);

    return projectButton;
};

updateMainContent();

export default {
    updateMainContent,
    setCurProject,
    getCurProject,
    setThisWeek,
    setToday,
};
