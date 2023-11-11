let curProjectId = 0;
let curItemId = 0;

import { isThisWeek, isToday } from 'date-fns';

const createItem = (
    name,
    date,
    description,
    priority,
    checked,
    projectId,
    id
) => {
    if (id === undefined) {
        id = curItemId++;
    }

    return { name, date, description, priority, checked, id, projectId };
};

const createProject = (name, id) => {
    if (id === undefined) {
        id = curProjectId++;
    }

    const addItem = (name, date, description, priority, checked) => {
        const item = createItem(name, date, description, priority, checked, id);
        projectObj.items.push(item);
        return item.id;
    };

    const deleteItem = (id) => {
        projectObj.items = projectObj.items.filter((item) => item.id !== id);
    };

    const getItem = (id) => {
        return projectObj.items.find((item) => item.id === id);
    };

    const projectObj = {
        name,
        id,
        items: [],
        addItem,
        deleteItem,
        getItem,
    };
    return projectObj;
};

const allProjects = (() => {
    const addProject = (name) => {
        const project = createProject(name);
        allProjectsObj.projects.push(project);
        return project.id;
    };

    const deleteProject = (projectId) => {
        allProjectsObj.projects = allProjectsObj.projects.filter(
            (project) => project.id !== projectId
        );
    };

    const getProject = (projectId) => {
        return allProjectsObj.projects.find(
            (project) => project.id === projectId
        );
    };

    const addItem = (projectId, name, date, description, priority, checked) => {
        return allProjectsObj.projects
            .find((project) => project.id === projectId)
            .addItem(name, date, description, priority, checked);
    };

    const deleteItem = (projectId, itemId) => {
        allProjectsObj.projects
            .find((project) => project.id === projectId)
            .deleteItem(itemId);
    };

    const getItem = (projectId, itemId) => {
        return allProjectsObj.projects
            .find((project) => project.id === projectId)
            .getItem(itemId);
    };

    const getAllItems = () => {
        return allProjectsObj.projects.map((project) => project.items).flat(1);
    };

    const getThisWeekItems = () => {
        return getAllItems().filter((item) => isThisWeek(item.date));
    };

    const getThisDayItems = () => {
        return getAllItems().filter((item) => isToday(item.date));
    };

    const saveProjects = () => {
        localStorage.todoList = JSON.stringify(allProjectsObj.projects);
    };

    const loadProjects = () => {
        if (localStorage.todoList === undefined) {
            allProjects.addProject('My Project');
            return;
        }

        const rawProjects = JSON.parse(localStorage.todoList);

        for (const rawProject of rawProjects) {
            if (rawProject.id >= curProjectId) {
                curProjectId = rawProject.id + 1;
            }
            const project = createProject(rawProject.name, rawProject.id);
            allProjectsObj.projects.push(project);

            for (const rawItem of rawProject.items) {
                if (rawItem.id >= curItemId) {
                    curItemId = rawItem.id + 1;
                }

                const item = createItem(
                    rawItem.name,
                    new Date(rawItem.date),
                    rawItem.description,
                    rawItem.priority,
                    rawItem.checked,
                    rawItem.projectId,
                    rawItem.id
                );
                project.items.push(item);
            }
        }
    };

    const allProjectsObj = {
        projects: [],
        addProject,
        deleteProject,
        getProject,
        addItem,
        deleteItem,
        getItem,
        getThisWeekItems,
        getThisDayItems,
        saveProjects,
        loadProjects,
    };
    return allProjectsObj;
})();

allProjects.loadProjects();

export default allProjects;
