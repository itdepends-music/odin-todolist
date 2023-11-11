import todoList from './todoList';
import mainContent from './mainContent';

const updateSidebar = () => {
    const editItemForm = document.getElementById('newItem');
    editItemForm.hidden = true;

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
    linkElem.addEventListener('click', () => changeProjectListener(id));
    projectLi.appendChild(linkElem);

    projectLi.appendChild(createProjectButton(id, 'edit'));
    projectLi.appendChild(createProjectButton(id, 'delete'));

    return projectLi;
};

const changeProjectListener = (id) => {
    const project = todoList.getProject(id);
    mainContent.setCurProject(project);
    mainContent.updateMainContent();
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

    if (mainContent.getCurProject() && mainContent.getCurProject().id === id) {
        mainContent.setCurProject(undefined);
        mainContent.updateMainContent();
    }

    todoList.saveProjects();
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

    if (
        mainContent.getCurProject !== undefined &&
        mainContent.getCurProject().id === id
    ) {
        mainContent.updateMainContent();
    }

    todoList.saveProjects();
};

const newProjectButton = document.getElementById('newProjectButton');
newProjectButton.addEventListener('click', () => {
    const id = todoList.addProject('');
    updateSidebar();
    editButtonHandler(id);
});

const today = document.getElementById('today');
today.addEventListener('click', () => {
    mainContent.setToday();
    mainContent.updateMainContent();
});
const thisWeek = document.getElementById('thisWeek');
thisWeek.addEventListener('click', () => {
    mainContent.setThisWeek();
    mainContent.updateMainContent();
});

updateSidebar();

export default updateSidebar;
