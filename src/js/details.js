
import { loadLaptops } from './api.js';

import {
    money,
    showError
} from './ui.js';

import {
    getFavorites,
    toggleFavorite,
    syncHeader
} from './storage.js';

syncHeader();

const id = Number(
    new URLSearchParams(location.search).get('id')
);

try {
    const laptops = await loadLaptops();

    const laptop = laptops.find(item => item.id === id);

    const root = document.querySelector('[data-detail]');

    if (!laptop) {
        root.innerHTML = `
            <div class="empty">
                Laptop not found.
                Please return to the catalogue.
            </div>
        `;

        throw new Error('The requested laptop ID does not exist.');
    }

    root.innerHTML = `
        <div>
            <img
                class="detail-image"
                src="${laptop.image}"
                alt="${laptop.name}"
                data-fallback-image
            >
        </div>

        <div class="detail-copy">

            <div class="eyebrow">
                ${laptop.brand} · ${laptop.category}
            </div>

            <h1>${laptop.name}</h1>

            <p class="muted">
                ${laptop.description}
            </p>

            <h2 class="price">
                ${money(laptop.price)}
            </h2>

            <div class="detail-actions">
                <button class="btn-action" id="favorite">
                    ♡ Add to favorites
                </button>

                <button class="btn-secondary" id="add-compare">
                    Add to comparison →
                </button>
            </div>

            <h3>Full specifications</h3>

            <table class="spec-table">
                <tbody>
                    ${Object.entries({
                        Brand: laptop.brand,
                        Category: laptop.category,
                        Processor: laptop.cpu,
                        RAM: laptop.ramGB + ' GB',
                        Storage: laptop.storageGB + ' GB',
                        Battery: laptop.batteryHours + ' hours',
                        Weight: laptop.weightKg + ' kg',
                        Screen: laptop.screenInches + ' inches',
                        Price: money(laptop.price)
                    }).map(([key, value]) => `
                        <tr>
                            <th>${key}</th>
                            <td>${value}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

        </div>
    `;

    const favoriteButton = document.getElementById('favorite');

    function updateFavoriteButton() {
        favoriteButton.textContent =
            getFavorites().includes(id)
                ? '♥ Saved to favorites'
                : '♡ Add to favorites';
    }

    favoriteButton.onclick = () => {
        toggleFavorite(id);
        updateFavoriteButton();
        syncHeader();
    };

    root.querySelector('[data-fallback-image]')
        .addEventListener('error', event => {
            event.currentTarget.src =
                'https://placehold.co/900x600?text=Laptop';
        }, { once: true });

    document.getElementById('add-compare').onclick = () => {
        if (!getFavorites().includes(id)) {
            toggleFavorite(id);
        }

        location.href = 'compare.html';
    };

    updateFavoriteButton();

} catch (error) {
    showError(error.message);
}
