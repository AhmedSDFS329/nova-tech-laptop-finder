
import { loadLaptops } from './api.js';

import {
    renderCard,
    bindFavoriteButtons,
    showError,
    skeletons
} from './ui.js';

import { syncHeader } from './storage.js';

syncHeader();

const grid = document.querySelector('[data-laptop-grid]');

const controls = [
    'search',
    'category',
    'max-price',
    'min-ram',
    'sort'
].map(id => document.getElementById(id));

let all = [];

function applyFilters() {
    const [q, cat, max, ram, sort] =
        controls.map(control => control.value);

    let list = all.filter(laptop =>
        (laptop.name + ' ' + laptop.brand)
            .toLowerCase()
            .includes(q.toLowerCase()) &&

        (cat === 'all' || laptop.category === cat) &&

        (!max || laptop.price <= Number(max)) &&

        laptop.ramGB >= Number(ram)
    );

    if (sort !== 'default') {
        const [key, dir] = sort.split('-');

        const field = {
            price: 'price',
            battery: 'batteryHours',
            weight: 'weightKg'
        }[key];

        list = [...list].sort((a, b) =>
            dir === 'asc'
                ? a[field] - b[field]
                : b[field] - a[field]
        );
    }

    document.querySelector('[data-result-count]')
        .textContent =
            `${list.length} laptop${list.length === 1 ? '' : 's'} found`;

    grid.innerHTML = list.length
        ? list.map(renderCard).join('')
        : `
            <div class="empty no-results">
                No laptops match these filters.
                Try changing your search.
            </div>
        `;

    bindFavoriteButtons();
}

try {
    grid.innerHTML = skeletons(6);

    all = await loadLaptops();

    controls.forEach(control => {
        control.addEventListener(
            control.tagName === 'INPUT' ? 'input' : 'change',
            applyFilters
        );
    });

    document.getElementById('reset').onclick = () => {
        controls.forEach(control => {
            control.value =
                control.id === 'category' ? 'all' :
                control.id === 'min-ram' ? '0' :
                control.id === 'sort' ? 'default' : '';
        });

        applyFilters();
    };

    applyFilters();

} catch (error) {
    showError(error.message);
}

