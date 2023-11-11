import sidebar from './sidebar';
import mainContent from './mainContent';

const showEditItemForm = (item) => {
    const newItem = document.getElementById('newItem');
    newItem.hidden = false;

    const name = document.getElementById('formName');
    name.value = item.name;

    const date = document.getElementById('formDate');
    date.valueAsDate = new Date(
        Date.UTC(
            item.date.getFullYear(),
            item.date.getMonth(),
            item.date.getDate()
        )
    );

    const description = document.getElementById('formDescription');
    description.value = item.description;

    const low = document.getElementById('formPriorityLow');
    const medium = document.getElementById('formPriorityMedium');
    const high = document.getElementById('formPriorityHigh');
    const priority = { low, medium, high };
    if (priority[item.priority]) {
        priority[item.priority].checked = true;
    }

    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        item.name = name.value;

        const UTCdate = date.valueAsDate;
        item.date = new Date(
            UTCdate.getUTCFullYear(),
            UTCdate.getUTCMonth(),
            UTCdate.getUTCDate()
        );

        item.description = description.value;

        if (low.checked) {
            console.log('test');
            item.priority = 'low';
        } else if (medium.checked) {
            item.priority = 'medium';
        } else if (high.checked) {
            item.priority = 'high';
        }

        sidebar();
        mainContent.updateMainContent();
    });

    const cancel = document.getElementById('cancel');
    cancel.addEventListener('click', () => {
        sidebar();
        mainContent.updateMainContent();
    });
};

export default showEditItemForm;
