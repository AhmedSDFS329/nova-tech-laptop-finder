
import { money } from './ui.js';

export function renderComparison(items) {

    const rows = [
        ['Price', 'price', 'min', money],
        ['Processor', 'cpu', 'text', value => value],
        ['RAM', 'ramGB', 'max', value => value + ' GB'],
        ['Storage', 'storageGB', 'max', value => value + ' GB'],
        ['Battery life', 'batteryHours', 'max', value => value + ' hours'],
        ['Weight', 'weightKg', 'min', value => value + ' kg'],
        ['Screen', 'screenInches', 'text', value => value + ' inch']
    ];

    const best = (key, mode) => {
        const values = items
            .map(item => item[key])
            .filter(value => typeof value === 'number');

        return mode === 'min'
            ? Math.min(...values)
            : Math.max(...values);
    };

    return `
        <div class="compare-scroll">

            <table class="compare-table">

                <thead>
                    <tr>
                        <th>Specification</th>

                        ${items.map(item => `
                            <th>
                                <img
                                    class="compare-thumb"
                                    src="${item.image}"
                                    alt=""
                                >
                                <br>
                                ${item.name}
                            </th>
                        `).join('')}

                    </tr>
                </thead>

                <tbody>

                    ${rows.map(([label, key, mode, format]) => `
                        <tr>

                            <th>${label}</th>

                            ${items.map(item => `
                                <td class="${
                                    mode !== 'text' &&
                                    item[key] === best(key, mode)
                                        ? 'best-value'
                                        : ''
                                }">

                                    ${format(item[key])}

                                    ${
                                        mode !== 'text' &&
                                        item[key] === best(key, mode)
                                            ? ' <span>★ Best</span>'
                                            : ''
                                    }

                                </td>
                            `).join('')}

                        </tr>
                    `).join('')}

                </tbody>

            </table>

        </div>
    `;
}
