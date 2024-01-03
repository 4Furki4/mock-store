import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from './components/theme-provider.tsx';
import Root from './routes/root.tsx';
import Products from './routes/products.tsx';
import Details from './routes/details.tsx';
import NotFound from './components/not-found.tsx';
import { store } from './store.ts'
import { Provider } from 'react-redux'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/products",
        element: <Products />,
        errorElement: <NotFound />,
      },
      {
        path: "/products/:id",
        element: <Details />,
        errorElement: <NotFound />,
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
