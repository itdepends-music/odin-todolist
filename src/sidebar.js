import todoList from './todoList';

todoList.addProject('Test Project');

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
    linkElem.textContent = 'New Project';
    projectLi.appendChild(linkElem);

    projectLi.appendChild(createProjectButton(id, 'edit'));
    projectLi.appendChild(createProjectButton(id, 'delete'));

    return projectLi;
};

const createProjectButton = (id, editOrDelete) => {
    const projectButton = document.createElement('button');
    projectButton.classList.add(editOrDelete);

    let icon;
    if (editOrDelete === 'edit') {
        icon = 'material-symbols:edit-outline';
    } else if (editOrDelete === 'delete') {
        icon = 'material-symbols:delete-outline';
    }

    const iconElem = document.createElement('iconify-icon');
    iconElem.setAttribute('icon', icon);
    projectButton.appendChild(iconElem);

    return projectButton;
};

updateSidebar();
