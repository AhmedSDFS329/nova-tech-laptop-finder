
import { loadLaptops } from './api.js';

import { renderComparison } from './compare-utils.js';

import {
    getFavorites,
    syncHeader
} from './storage.js';

syncHeader();

try {
    const all = await loadLaptops();

    const favorites = all.filter(laptop =>
        getFavorites().includes(laptop.id)
    );

    const picker = document.querySelector(
        '[data-compare-picker]'
    );

    const output = document.querySelector(
        '[data-comparison]'
    );

    const message = document.querySelector(
        '[data-compare-message]'
    );

    let selected = [];

    if (!favorites.length) {

        picker.innerHTML = `
            <div class="empty">
                Save laptops to favorites first,
                then compare them here.
            </div>
        `;

    } else {

        picker.innerHTML = favorites.map(laptop => `
            <button
                class="choice"
                data-choice="${laptop.id}"
            >
                ${laptop.name}
            </button>
        `).join('');

        picker.querySelectorAll('[data-choice]')
            .forEach(button => {

                button.onclick = () => {

                    const id = Number(button.dataset.choice);

                    if (selected.includes(id)) {

                        selected = selected.filter(
                            item => item !== id
                        );

                    } else if (selected.length < 4) {

                        selected.push(id);

                    } else {

                        message.textContent =
                            'You can compare a maximum of four laptops.';

                        return;
                    }

                    picker.querySelectorAll('[data-choice]')
                        .forEach(element => {
                            element.classList.toggle(
                                'selected',
                                selected.includes(
                                    Number(element.dataset.choice)
                                )
                            );
                        });

                    message.textContent =
                        `${selected.length} selected · Choose 2–4 laptops.`;

                    output.innerHTML = selected.length >= 2
                        ? renderComparison(
                            favorites.filter(item =>
                                selected.includes(item.id)
                            )
                        )
                        : '';
                };
            });
    }

} catch (error) {

    document.querySelector('[data-compare-message]')
        .textContent = error.message;
}
