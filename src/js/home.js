
import { loadLaptops } from './api.js';

import {
    renderCard,
    bindFavoriteButtons,
    money,
    showError
} from './ui.js';

import {
    getFavorites,
    syncHeader
} from './storage.js';

syncHeader();

try {
    const laptops = await loadLaptops();

    document.querySelector('[data-stat="count"]')
        .textContent = laptops.length;

    document.querySelector('[data-stat="lowest"]')
        .textContent = money(
            laptops.reduce(
                (minimum, laptop) =>
                    Math.min(minimum, laptop.price),
                Infinity
            )
        );

    document.querySelector('[data-stat="favorites"]')
        .textContent = getFavorites().length;

    document.querySelector('[data-featured]')
        .innerHTML = laptops
            .slice(0, 3)
            .map(renderCard)
            .join('');

    bindFavoriteButtons();

    document.querySelectorAll('[data-fav]')
        .forEach(button => {
            button.addEventListener('click', () => {
                setTimeout(() => {
                    document.querySelector(
                        '[data-stat="favorites"]'
                    ).textContent = getFavorites().length;
                }, 0);
            });
        });

} catch (error) {
    showError(error.message);
}
