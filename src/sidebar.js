import todoList from './todoList';

const updateSidebar = () => {
    const projectsListElem = document.getElementById('projectsList');
    projectsListElem.innerHTML = '';
    for (const project of todoList.projects) {
        projectsListElem.appendChild(createProjectLi(project.name, project.id));
    }
};

const createProjectLi = (name, id) => {
    const projectLi = document.createElement('li');
    projectLi.classList.add('project');
    projectLi.dataset.id = id;

    const linkElem = document.createElement('a');
    linkElem.href = '#';
    linkElem.textContent = name;
    projectLi.appendChild(linkElem);

    projectLi.appendChild(createProjectButton(id, 'edit'));
    projectLi.appendChild(createProjectButton(id, 'delete'));

    return projectLi;
};

const createProjectButton = (id, editOrDelete) => {
    let icon, handler;
    if (editOrDelete === 'edit') {
        handler = () => editButtonHandler(id);
        icon = 'material-symbols:edit-outline';
    } else if (editOrDelete === 'delete') {
        icon = 'material-symbols:delete-outline';
        handler = () => deleteProjectHandler(id);
    }

    const projectButton = document.createElement('button');
    projectButton.classList.add(editOrDelete);
    projectButton.addEventListener('click', handler);

    const iconElem = document.createElement('iconify-icon');
    iconElem.setAttribute('icon', icon);
    projectButton.appendChild(iconElem);

    return projectButton;
};

const deleteProjectHandler = (id) => {
    todoList.deleteProject(id);
    updateSidebar();
};

const editButtonHandler = (id) => {
    const projectsListElem = document.getElementById('projectsList');
    const projectElem = projectsListElem.querySelector(`li[data-id="${id}"]`);
    projectElem.innerHTML = '';

    const form = document.createElement('form');
    form.addEventListener('submit', (e) => projectNameFormHandler(e, id));

    const input = document.createElement('input');
    input.type = 'text';
    form.appendChild(input);

    projectElem.appendChild(form);
};

const projectNameFormHandler = (e, id) => {
    e.preventDefault();
    const textInput = e.target.getElementsByTagName('input')[0];
    const name = textInput.value;
    todoList.getProject(id).name = name;
    updateSidebar();
};

const newProjectButton = document.getElementById('newProjectButton');
newProjectButton.addEventListener('click', () => {
    const id = todoList.addProject('');
    updateSidebar();
    editButtonHandler(id);
});

updateSidebar();
