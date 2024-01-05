# Mock Store

## Used Technologies

- React + TypeScript + Vite
- Redux Toolkit
- React Router
- React Hook Form
- Shadcn UI


## Features

### Root

- The mock product data is fetched from an API and stored in the Redux store.

### Navbar

- A navbar with a home icon, product list link, and a create product link that opens a dialog.

### Home Page

- A welcome message with a gif and product count that links to the product list page.

### Product List Page

- A list of products with a search bar and a filter by category dropdown.

### Product Detail Page

- The product will be displayed from the store or fetched from the API if it is not in the store.

- A product detail page with a product image, name, price, description, and rating.

- The product can be edited or deleted from the product detail page. User can fill the form and submit it to update the product. A confirmation dialog will be displayed before deleting the product. A mock put or delete request will be sent to the API and a toaster with loading, success, or error message will be displayed. The product will be updated or deleted from the store if the request is successful.

### Create Product Dialog

- A dialog with a form to create a product. User can fill the form and submit it to create the product. A mock post request will be sent to the API and a toaster with loading, success, or error message will be displayed. The product will be added to the store if the request is successful.














# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
