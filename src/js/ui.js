
import {
    getFavorites,
    toggleFavorite
} from './storage.js';

export const money = value =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(value);

export function renderCard(laptop) {
    const saved = getFavorites().includes(laptop.id);

    return `
        <article class="laptop-card">

            <a class="card-image"
               href="details.html?id=${laptop.id}">

                <img
                    src="${laptop.image}"
                    alt="${laptop.name}"
                    loading="lazy"
                    data-fallback-image
                >
            </a>

            <div class="card-body">

                <div class="eyebrow">
                    ${laptop.brand} · ${laptop.category}
                </div>

                <h3>
                    <a href="details.html?id=${laptop.id}">
                        ${laptop.name}
                    </a>
                </h3>

                <p class="muted">
                    ${laptop.cpu} · ${laptop.ramGB}GB RAM
                </p>

                <div class="spec-pills">
                    <span>${laptop.storageGB}GB SSD</span>
                    <span>${laptop.batteryHours}h battery</span>
                </div>

                <div class="card-bottom">
                    <strong class="price">
                        ${money(laptop.price)}
                    </strong>

                    <button
                        class="icon-btn ${saved ? 'is-saved' : ''}"
                        data-fav="${laptop.id}"
                        aria-label="Toggle favorite"
                    >
                        ${saved ? '♥' : '♡'}
                    </button>
                </div>

                <a class="btn-action"
                   href="details.html?id=${laptop.id}">
                    View details <span>↗</span>
                </a>

            </div>
        </article>
    `;
}

export function bindFavoriteButtons() {
    document.querySelectorAll('[data-fav]')
        .forEach(button => {
            button.onclick = () => {
                toggleFavorite(Number(button.dataset.fav));

                const label =
                    button.textContent.trim() === '♥' ? '♡' : '♥';

                button.textContent = label;
                button.classList.toggle('is-saved');

                document.querySelectorAll('[data-fav-count]')
                    .forEach(el => {
                        el.textContent = JSON.parse(
                            localStorage.getItem(
                                'studentFinderFavorites'
                            ) || '[]'
                        ).length;
                    });
            };
        });

    document.querySelectorAll('[data-fallback-image]')
        .forEach(img => {
            img.addEventListener('error', event => {
                event.currentTarget.src =
                    'https://placehold.co/800x500?text=Laptop';
            }, { once: true });
        });
}

export function showError(message) {
    const element = document.querySelector('[data-error]');

    if (element) {
        element.textContent = message;
        element.hidden = false;
    }
}

export function skeletons(count = 6) {
    return Array.from(
        { length: count },
        () => `
            <div class="skeleton animate-pulse">
                <div class="sk-image"></div>
                <div class="sk-line"></div>
                <div class="sk-line short"></div>
            </div>
        `
    ).join('');
}
