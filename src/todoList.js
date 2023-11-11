let curProjectId = 0;
let curItemId = 0;

import { isThisWeek, isThisMonth } from 'date-fns/isThisWeek';

const createItem = (name, date, description, priority, checked, projectId) => {
    const id = curItemId++;

    return { name, date, description, priority, checked, id, projectId };
};

const createProject = (name) => {
    const id = curProjectId++;

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
        [...allProjectsObj.projects.map((project) => project.items)];
    };

    const getThisWeekItems = () => {
        return getAllItems.filter((item) => isThisWeek(item.date));
    };

    const getThisMonthItems = () => {
        return getAllItems.filter((item) => isThisMonth(item.date));
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
        getThisMonthItems,
    };
    return allProjectsObj;
})();

allProjects.addProject('My Project');
allProjects.addItem(0, 'name', new Date(), 'description', 'medium', false);
allProjects.addItem(0, 'name 2', new Date(), 'description 2', 'high', true);

export default allProjects;
