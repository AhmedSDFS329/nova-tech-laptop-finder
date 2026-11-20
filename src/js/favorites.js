
import { loadLaptops } from './api.js';

import {
    renderCard,
    bindFavoriteButtons,
    money,
    showError
} from './ui.js';

import {
    getFavorites,
    saveFavorites,
    syncHeader
} from './storage.js';

syncHeader();

try {
    const all = await loadLaptops();

    function render() {
        const ids = getFavorites();

        const items = all.filter(laptop =>
            ids.includes(laptop.id)
        );

        document.querySelector('[data-total-count]')
            .textContent = items.length;

        const total = items.reduce(
            (sum, laptop) => sum + laptop.price,
            0
        );

        document.querySelector('[data-total-price]')
            .textContent = money(total);

        document.querySelector('[data-average-price]')
            .textContent = money(
                items.length ? total / items.length : 0
            );

        const grid = document.querySelector(
            '[data-favorites-grid]'
        );

        grid.innerHTML = items.length
            ? items.map(renderCard).join('')
            : `
                <div class="empty no-results">
                    No favorites yet.
                    Explore the catalogue and tap ♡ to save a laptop.
                </div>
            `;

        bindFavoriteButtons();

        grid.querySelectorAll('[data-fav]')
            .forEach(button => {
                button.addEventListener('click', () => {
                    setTimeout(render, 0);
                });
            });
    }

    document.getElementById('clear-favorites').onclick = () => {
        saveFavorites([]);
        render();
        syncHeader();
    };

    render();

} catch (error) {
    showError(error.message);
}
