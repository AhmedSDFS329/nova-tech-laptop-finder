
# NOVA TECH - Student Laptop Finder

SW302 Assignment 2 - JavaScript & Tailwind CSS 4

## Project Overview

NOVA TECH is a responsive Student Laptop Finder web application.

It allows students to:
- Browse laptop products.
- Search laptops by name or brand.
- Filter by category, price and RAM.
- Sort laptops by price, battery life and weight.
- View complete laptop specifications.
- Save and remove favorite laptops.
- Compare 2 to 4 favorite laptops.
- Switch between Performance Mode and Battery Saver Mode.

## Technologies

- HTML5
- JavaScript ES Modules
- JSON
- Tailwind CSS 4
- LocalStorage
- Fetch API

## Project Structure

```text
laptop_finder_mazen/
│
├── index.html
├── laptops.html
├── details.html
├── favorites.html
├── compare.html
│
├── data/
│   └── laptops.json
│
├── dist/
│   └── output.css
│
├── src/
│   ├── input.css
│   └── js/
│       ├── api.js
│       ├── storage.js
│       ├── ui.js
│       ├── compare-utils.js
│       ├── compare.js
│       ├── home.js
│       ├── laptops.js
│       ├── details.js
│       └── favorites.js
│
├── package.json
└── README.md

## Installation

Make sure Node.js and npm are installed.

Run:

```bash
npm install
```

## Build Tailwind CSS

```bash
npm run build
```

## Development Mode

To automatically rebuild CSS when files change:

```bash
npm run watch
```

## Running the Website

1. Open the project in Visual Studio Code.
2. Install the Live Server extension.
3. Right-click index.html.
4. Select Open with Live Server.

Do not open HTML files directly because the application uses fetch() to load JSON data.

## Data Storage

Laptop data is stored in data/laptops.json.

Favorites and theme preferences are stored using LocalStorage.

## Important Notes

- node_modules should not be included in the submission.
- Run npm install before building.
- Use a local development server.
- Test the website on mobile, tablet and desktop screens.

## GitHub Repository

Add your repository link here.

## Author

Student Laptop Finder - SW302
