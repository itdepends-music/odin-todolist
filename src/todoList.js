let curProjectId = 0;
let curItemId = 0;

import { isThisWeek, isThisMonth } from 'date-fns/isThisWeek';

const createItem = (name, date, description, priority, projectId) => {
    const id = curItemId++;

    return { name, date, description, priority, id, projectId };
};

const createProject = (name) => {
    const id = curProjectId++;
    let items = [];

    const addItem = (name, date, description, priority) => {
        const item = createItem(name, date, description, priority, id);
        items.push(item);
        return item.id;
    };

    const deleteItem = (id) => {
        items = items.filter((item) => item.id !== id);
    };

    const getItem = (id) => {
        return items.find((item) => item.id === id);
    };

    return { name, id, items, addItem, deleteItem, getItem };
};

const allProjects = (() => {
    let projects = [];

    const addProject = (name) => {
        const project = createProject(name);
        projects.push(project);
        return project.id;
    };

    const deleteProject = (projectId) => {
        projects = projects.filter((project) => project.id !== projectId);
    };

    const getProject = (projectId) => {
        return projects.find((project) => project.id === projectId);
    };

    const addItem = (projectId, name, date, description, priority) => {
        return projects
            .find((project) => project.id === projectId)
            .addItem(name, date, description, priority);
    };

    const deleteItem = (projectId, itemId) => {
        projects.find((project) => project.id === projectId).deleteItem(itemId);
    };

    const getItem = (projectId, itemId) => {
        return projects
            .find((project) => project.id === projectId)
            .getItem(itemId);
    };

    const getAllItems = () => {
        [...projects.map((project) => project.items)];
    };

    const getThisWeekItems = () => {
        return getAllItems.filter((item) => isThisWeek(item.date));
    };

    const getThisMonthItems = () => {
        return getAllItems.filter((item) => isThisMonth(item.date));
    };

    return {
        projects,
        addProject,
        deleteProject,
        getProject,
        addItem,
        deleteItem,
        getItem,
        getThisWeekItems,
        getThisMonthItems,
    };
})();

export default allProjects;
