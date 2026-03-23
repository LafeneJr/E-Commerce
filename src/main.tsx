import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App.tsx'
import { HeroSection } from './Components/LandingPage/HeroSection.tsx'
import { Layout } from './Pages/ProductPage/Layout.tsx'
import { Provider } from 'react-redux'
import { store } from './Store/index.tsx'
import { ProductItem } from './Pages/ProductPage/ProductItem.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}> 
      <App />,
      </Provider>
    ),
    children: [
      {
        index: true,
        element: <HeroSection />
      },
      {
        path: "productstore",
        element: <Layout />
      },
      {
        path: "productstore/product/:id",
        element: <ProductItem />
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)