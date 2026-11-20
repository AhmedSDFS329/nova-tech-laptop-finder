
export async function loadLaptops() {
    try {
        const response = await fetch('./data/laptops.json');

        if (!response.ok) {
            throw new Error('Could not load laptop data.');
        }

        return await response.json();

    } catch (error) {
        console.error(error);

        throw new Error(
            'Laptop data could not be loaded. Run this project with VS Code Live Server.'
        );
    }
}
