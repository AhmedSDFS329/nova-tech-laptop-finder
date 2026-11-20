
const FAV_KEY = 'studentFinderFavorites';
const THEME_KEY = 'studentFinderTheme';

export const getFavorites = () =>
    JSON.parse(localStorage.getItem(FAV_KEY) || '[]');

export const saveFavorites = (ids) =>
    localStorage.setItem(FAV_KEY, JSON.stringify(ids));

export function toggleFavorite(id) {
    const ids = getFavorites();

    const next = ids.includes(id)
        ? ids.filter(x => x !== id)
        : [...ids, id];

    saveFavorites(next);
    return next;
}

export const getTheme = () =>
    localStorage.getItem(THEME_KEY) || 'performance';

export function saveTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.dataset.theme = theme;
}

export function syncHeader() {
    const theme = getTheme();

    document.documentElement.dataset.theme = theme;

    document.querySelectorAll('[data-fav-count]')
        .forEach(el => {
            el.textContent = getFavorites().length;
        });

    document.querySelectorAll('[data-theme-toggle]')
        .forEach(button => {
            button.textContent =
                theme === 'performance'
                    ? '☀ Battery Saver'
                    : '☾ Performance';

            button.onclick = () => {
                saveTheme(
                    getTheme() === 'performance'
                        ? 'battery'
                        : 'performance'
                );

                syncHeader();
            };
        });

    document.querySelectorAll('[data-menu-toggle]')
        .forEach(button => {
            button.onclick = () => {
                document.querySelector('[data-nav]')
                    .classList.toggle('nav-open');
            };
        });
}
