# Description

A restaurant ordering web app built with React and Vite. Browse the menu, add dishes to your cart, check out, and revisit your past orders — all backed by a clean Context API state layer and styled with Tailwind CSS v4.

## Features

- **Browse the menu** — dishes are loaded from a local JSON "API" (`public/menu.json`), each with an image, description, price, rating, and tags (e.g. Vegan, Vegetarian).
- **Search** — search the menu by dish name from the navbar.
- **Shopping cart** — add items with a chosen quantity, adjust or remove them, and see a live cart item count in the navbar. Cart state persists in `localStorage`.
- **Checkout** — a simple delivery form (name, address, phone) with a confirmation step before the order is placed.
- **Order confirmation** — a receipt-style summary showing items, total, delivery address, and an order ID.
- **Order history** — past orders are saved to `localStorage` and can be searched, sorted (newest/oldest/price), and paginated. Any past order can be viewed in detail or **re-ordered** in one click.

## Tech Stack

- [React 19](https://react.dev/) with the React Compiler
- [Vite](https://vitejs.dev/) as the build tool / dev server
- [React Router v7](https://reactrouter.com/) for routing
- [Tailwind CSS v4](https://tailwindcss.com/) for styling, with a custom "bistro" color theme
- [Font Awesome](https://fontawesome.com/) for icons
- React Context API for global cart and search state (no external state library)
- Browser `localStorage` for persisting the cart and order history — **no backend/database is used**

## Project Structure

```
ecommerce/
├── public/
│   └── menu.json          # Mock menu data source (fetched at runtime)
├── src/
│   ├── assets/             # Images and logos
│   ├── components/         # Reusable UI pieces (cards, modals, nav, footer)
│   ├── context/             # CartContext and SearchContext
│   ├── pages/                # Route-level components
│   ├── App.jsx               # Router setup + global state providers
│   └── main.jsx               # App entry point
├── index.html
├── vite.config.js
└── package.json
```

### Key pages/routes

| Route             | Page                   | Description                          |
|--------------------|------------------------|---------------------------------------|
| `/`                | `HomePage`              | Landing page with links to the menu and cart |
| `/products`        | `Products`               | Full menu, filterable by search       |
| `/products/:id`    | `ProductDetailsPage`     | Single dish details                   |
| `/cart`            | `CartPage`                | Current cart contents and total       |
| `/checkout`        | `CheckOutPage`             | Delivery details form + confirmation  |
| `/orderhistory`    | `OrderHistoryPage`          | Past orders, searchable/sortable/paginated |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd ecommerce
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite reports in the terminal).

### Other scripts

```bash
npm run build     # Production build
npm run preview   # Preview the production build locally
npm run lint       # Run ESLint
```

## Data Source

Menu items are served from `public/menu.json` and fetched client-side. There is no backend — this file acts as a mock API. To add, remove, or edit dishes, update this file directly; each item should include:

```json
{
  "id": "m1",
  "name": "Truffle Fries",
  "description": "...",
  "price": 9.5,
  "category": "Starters",
  "image": "https://...",
  "rating": 4.8,
  "tags": ["Vegetarian"],
  "isPopular": true,
  "inStock": true
}
```

## Known Limitations / Notes

- Cart and order history are stored in the browser's `localStorage`, so data is per-browser and will be lost if storage is cleared.
- There is no real payment processing — checkout only collects delivery details.
- There is no authentication; orders aren't tied to a user account.

## Credits

- Icons via [Flaticon](https://www.flaticon.com/) (restaurant icons by Freepik, empty-state icons by Freepik)
- Menu photography via [Unsplash](https://unsplash.com/)

## License

Add a license of your choice (e.g. MIT) here.